import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import { setupInterceptors } from '../interceptors'

// 创建实例
const baseURL = '/api/'
const timeout = 10000
function createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        // 跨域请求凭证
        // withCredentials: true,
        // // 请求参数序列化
        // paramsSerializer: {
        //     serialize: (params) => {
        //         return Object.entries(params)
        //             .map(([key, value]) => {
        //                 if (value === null || value === undefined) return ''
        //                 if (Array.isArray(value)) {
        //                     return value
        //                         .map(
        //                             (v) =>
        //                                 `${encodeURIComponent(key)}=${encodeURIComponent(v)}`,
        //                         )
        //                         .join('&')
        //                 }
        //                 return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        //             })
        //             .filter(Boolean)
        //             .join('&')
        //     },
        // },
    })

    // 安装拦截器
    setupInterceptors(instance)

    return instance
}
const httpClient = createAxiosInstance()

export default httpClient

export interface RequestConfig extends AxiosRequestConfig {
    // 自定义配置
    showError?: boolean // 是否显示错误提示
    showLoading?: boolean // 是否显示加载状态
    retryCount?: number // 重试次数
    cache?: boolean // 是否启用缓存
    cacheKey?: string // 缓存key
    cacheTime?: number // 缓存时间(ms)
}

export const request = {
    get: <T = any>(
        url: string,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .get(url, config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },
    post: <T = any>(
        url: string,
        data?: any,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .post(url, data, config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },

    put: <T = any>(
        url: string,
        data?: any,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .put(url, data, config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },
    delete: <T = any>(
        url: string,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .delete(url, config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    patch: <T = any>(
        url: string,
        data?: any,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .delete(url, config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },
    // httpClient.patch<Service.ResType<T>>(url, data, config),

    // 文件上传专用
    upload: <T = any>(
        url: string,
        formData: FormData,
        config?: RequestConfig,
    ): Promise<Service.ResType<T>> => {
        return new Promise((resolve, reject) => {
            httpClient
                .post<Service.ResType<T>>(url, formData, {
                    ...config,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...config?.headers,
                    },
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },

    download(url: string) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}
