import { ref, onUnmounted, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { request } from '../http/index'
import type { AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
    // 自定义配置
    showError?: boolean // 是否显示错误提示
    showLoading?: boolean // 是否显示加载状态
    retryCount?: number // 重试次数
    cache?: boolean // 是否启用缓存
    cacheKey?: string // 缓存key
    cacheTime?: number // 缓存时间(ms)
}

interface UseRequestOptions<T, P> extends RequestConfig {
    manual?: boolean
    initialData?: T
    defaultParams?: P
    ready?: Ref<boolean> | boolean
    debounce?: number
    throttle?: number
    pollingInterval?: number
    cacheKey?: string
    onSuccess?: (data: T, params: P) => void
    onError?: (error: any, params: P) => void
    onFinally?: () => void
}

interface UseRequestReturn<T, P> {
    data: Ref<T | null>
    loading: Ref<boolean>
    error: Ref<any>
    response: Ref<Service.ResType<T> | null>
    run: (params?: P) => Promise<T | undefined>
    runAsync: (params?: P) => Promise<T>
    mutate: (newData: T | ((old: T | null) => T)) => void
    cancel: () => void
    refresh: () => Promise<T | undefined>
}

export function useRequest<T = any, P = any>(
    service:
        | string
        | ((params: P, config?: RequestConfig) => Promise<Service.ResType<T>>),
    options: UseRequestOptions<T, P> = {},
): UseRequestReturn<T, P> {
    const {
        manual = false,
        initialData = null,
        defaultParams,
        ready = ref(true),
        debounce = 0,
        throttle = 0,
        pollingInterval = 0,
        cacheKey,
        ...requestConfig
    } = options

    // 状态
    const data = ref<T | null>(initialData)
    const loading = ref(false)
    const error = ref<any>(null)
    const response = ref<Service.ResType<T> | null>(null)

    // 内部状态
    let abortController: AbortController | null = null
    let debounceTimer: NodeJS.Timeout | null = null
    let throttlePause = false
    let pollingTimer: NodeJS.Timeout | null = null
    const cacheStore = new Map<string, { data: T; timestamp: number }>()

    // 创建服务函数
    const createService = () => {
        if (typeof service === 'string') {
            return (params: P, config?: RequestConfig) =>
                request.get<T>(service, { ...requestConfig, ...config, params })
        }
        return service
    }

    const serviceFn = createService()

    // 核心执行函数
    const execute = async (params?: P): Promise<T | undefined> => {
        // 检查就绪状态
        const isReady = typeof ready === 'boolean' ? ready : ready.value
        if (!isReady) return

        // 防抖
        if (debounce > 0) {
            return new Promise((resolve) => {
                if (debounceTimer) clearTimeout(debounceTimer)
                debounceTimer = setTimeout(async () => {
                    const result = await executeInternal(params)
                    resolve(result)
                }, debounce)
            })
        }

        // 节流
        if (throttle > 0 && throttlePause) {
            return Promise.resolve(data.value as T)
        }

        if (throttle > 0) {
            throttlePause = true
            setTimeout(() => {
                throttlePause = false
            }, throttle)
        }

        return executeInternal(params)
    }

    const executeInternal = async (params?: P): Promise<T | undefined> => {
        try {
            // 缓存检查
            const cacheKeyValue = cacheKey
                ? `${cacheKey}-${JSON.stringify(params || defaultParams)}`
                : null
            if (cacheKeyValue) {
                const cached = cacheStore.get(cacheKeyValue)
                if (
                    cached &&
                    Date.now() - cached.timestamp <
                        (options.cacheTime || 300000)
                ) {
                    data.value = cached.data
                    options.onSuccess?.(cached.data, params as P)
                    return cached.data
                }
            }

            // 取消之前的请求
            if (abortController) {
                abortController.abort()
            }

            abortController = new AbortController()

            loading.value = true
            error.value = null

            // 执行请求
            const result = await serviceFn(params || (defaultParams as P), {
                ...requestConfig,
                signal: abortController.signal,
            })

            // 处理响应
            data.value = result
            response.value = result

            // 缓存
            if (cacheKeyValue) {
                cacheStore.set(cacheKeyValue, {
                    data: result as T,
                    timestamp: Date.now(),
                })
            }

            // 成功回调
            options.onSuccess?.(result as T, params as P)

            return result as T
        } catch (err: any) {
            // 取消请求不报错
            if (err?.name === 'AbortError' || err?.message?.includes('abort')) {
                return
            }

            error.value = err

            // 错误处理
            if (options.showError !== false) {
                console.error('请求错误:', err)
            }

            options.onError?.(err, params as P)
            throw err
        } finally {
            loading.value = false
            abortController = null
            options.onFinally?.()
        }
    }

    // 轮询
    const startPolling = () => {
        if (pollingInterval <= 0 || pollingTimer) return

        const poll = async () => {
            await execute(defaultParams).catch(() => {})
            if (pollingTimer) {
                pollingTimer = setTimeout(poll, pollingInterval)
            }
        }

        pollingTimer = setTimeout(poll, pollingInterval)
    }

    // 停止轮询
    const stopPolling = () => {
        if (pollingTimer) {
            clearTimeout(pollingTimer)
            pollingTimer = null
        }
    }

    // 取消请求
    const cancel = () => {
        if (abortController) {
            abortController.abort()
            abortController = null
        }
        stopPolling()
        loading.value = false
    }

    // 修改数据
    const mutate = (newData: T | ((old: T | null) => T)) => {
        if (typeof newData === 'function') {
            data.value = (newData as any)(data.value)
        } else {
            data.value = newData
        }
    }

    // 刷新
    const refresh = () => execute(defaultParams)

    // 监听ready状态
    if (typeof ready !== 'boolean') {
        watch(ready, (newVal) => {
            if (newVal && !manual) {
                execute(defaultParams)
            }
        })
    }

    // 自动执行
    if (!manual && (typeof ready === 'boolean' ? ready : ready.value)) {
        execute(defaultParams)
    }

    // 启动轮询
    if (pollingInterval > 0 && !manual) {
        startPolling()
    }

    // 组件卸载时清理
    onUnmounted(() => {
        cancel()
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
    })

    return {
        data,
        loading,
        error,
        response,
        run: execute,
        runAsync: executeInternal,
        mutate,
        cancel,
        refresh,
    }
}

// 分页请求Hook
export function usePaginationRequest<
    T = any,
    P extends { page: number; pageSize: number } = {
        page: number
        pageSize: number
    },
>(
    service:
        | string
        | ((
              params: P,
          ) => Promise<Service.ResType<Service.PaginationResponse<T>>>),
    defaultParams: P,
    options: Omit<
        UseRequestOptions<Service.PaginationResponse<T>, P>,
        'manual' | 'defaultParams'
    > = {},
) {
    const { data, loading, error, run, mutate } = useRequest<
        Service.PaginationResponse<T>,
        P
    >(service, {
        ...options,
        defaultParams,
        manual: true,
    })

    // 分页方法
    const pagination = {
        current: ref(defaultParams.page || 1),
        pageSize: ref(defaultParams.pageSize || 10),
        total: computed(() => data.value?.total || 0),
    }

    // 加载指定页
    const loadPage = async (page: number) => {
        pagination.current.value = page
        const params = {
            ...defaultParams,
            page,
            pageSize: pagination.pageSize.value,
        } as P
        return run(params)
    }

    // 更改每页大小
    const changePageSize = async (size: number) => {
        pagination.pageSize.value = size
        return loadPage(1)
    }

    // 首次加载
    loadPage(pagination.current.value)

    return {
        data,
        loading,
        error,
        list: computed(() => data.value?.list || []),
        pagination,
        loadPage,
        changePageSize,
        refresh: () => loadPage(pagination.current.value),
        mutate,
    }
}
