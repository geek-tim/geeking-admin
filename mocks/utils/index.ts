import { http, HttpResponse } from 'msw'

export const responseWrapper = (data: any, code = 200, message = 'success') => {
    return HttpResponse.json({
        code,
        message,
        data,
    })
}

export interface RequestOptions {
    isValidate: (query: any) => boolean
    requiresAuth: boolean
}

export const request = {
    get: (url: string, data: any, options?: Partial<RequestOptions>) => {
        return http.get(url, async ({ request: req }) => {
            if (options?.isValidate) {
                const query = await req.json()
                if (!options.isValidate(query)) {
                    return HttpResponse.json(
                        { error: 'xxxx校验出错', code: 100202 },
                        { status: 200 },
                    )
                }
            }
            if (options?.requiresAuth) {
                const authHeader = req.headers.get('Authorization')
                if (authHeader !== 'Bearer mock-jwt-token') {
                    return HttpResponse.json(
                        { error: 'Token 已过期', code: 100105 },
                        { status: 401 },
                    )
                }
            }
            return responseWrapper(data)
        })
    },
    post: (url: string, data: any, options?: Partial<RequestOptions>) => {
        console.log('url------1', url)
        return http.post(url, async ({ request: req }) => {
            console.log('url------2', url)
            if (options?.isValidate) {
                const query = await req.json()
                if (!options.isValidate(query)) {
                    return HttpResponse.json(
                        { error: 'xxxx校验出错', code: 100202 },
                        { status: 200 },
                    )
                }
            }
            if (options?.requiresAuth) {
                const authHeader = req.headers.get('Authorization')
                if (authHeader !== 'Bearer mock-jwt-token') {
                    return HttpResponse.json(
                        { error: 'Token 已过期', code: 100105 },
                        { status: 401 },
                    )
                }
            }
            return responseWrapper(data)
        })
    },
    delete: (url: string, manager: MockDataManager) => {
        return http.post(url, async ({ params }) => {
            const { id } = params
            if (manager.deleteById(Number(id))) {
                return HttpResponse.json({
                    code: 200,
                    message: `${id} 删除成功`,
                })
            } else {
                return HttpResponse.json({
                    code: 120023, // TODO
                    message: `${id} 删除失败`,
                })
            }
        })
    },
}

type DataMode = 'MEMORY' | 'LOCAL_STORAGE' | 'INDEXDB'

export class MockDataManager {
    private mode: DataMode = 'MEMORY'
    private data: any[] = []
    private storageKey: string
    private stored: boolean = false

    constructor(storageKey: string, initialData: any[], mode = 'MEMORY') {
        this.stored = mode == 'LOCAL_STORAGE'
        this.storageKey = storageKey
        this.loadData(initialData)
    }

    private loadData(initialData: any[]) {
        this.data = this.stored
            ? JSON.parse(localStorage.getItem(this.storageKey) || '')
            : [...initialData]
    }

    getAll() {
        return [...this.data]
    }
    updateById(id: number, data: any) {
        const index = this.data.findIndex((item) => item.id === id)
        if (index != -1) {
            this.data[index] = data
        }
    }
    getById(id: number) {
        const index = this.data.findIndex((item) => item.id === id)
        if (index != -1) {
            return this.data[index]
        }
        return null
    }
    filter<T extends Record<string, any>>(conditions: T) {
        const matched = this.data.filter((item) => {
            return Object.keys(conditions).every((key) => {
                return item[key] === conditions[key]
            })
        })
        return matched
    }
    deleteById(id: number) {
        const index = this.data.findIndex((item) => item.id === id)
        if (index !== -1) {
            this.data.splice(index, 1)
            this.saveToStorage()
            return true
        }
        return false
    }

    reset() {
        if (this.stored) {
            localStorage.removeItem(this.storageKey)
        }
        this.loadData([]) // 或者重新加载初始数据
    }

    saveToStorage() {
        if (this.stored) {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data))
        }
    }
}
