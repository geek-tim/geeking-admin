// import { storage } from '@/utils/storage' // 你的存储工具
import { v4 as uuidv4 } from 'uuid' // 用于生成请求ID
import { useAuthStore } from '@/store/auth'
import type { InternalAxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

export class RequestInterceptor {
    async onFulfilled(config: InternalAxiosRequestConfig) {
        NProgress.start()
        const authStore = useAuthStore()

        // 1. 添加认证令牌1
        if (authStore.token) {
            config.headers.Authorization = `${authStore.tokenType} ${authStore.token}`
        }

        // 2. 添加请求ID（用于全链路追踪）
        config.headers['X-Request-ID'] = uuidv4()

        // 3. 添加时间戳（防止缓存）
        if (config.method?.toLowerCase() === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now(),
            }
        }

        // 4. 记录请求开始时间（用于性能监控）
        ;(config as any)._startTime = Date.now()

        return config
    }

    onRejected(error: any) {
        NProgress.done()
        console.error('请求拦截器错误:', error)
        return Promise.reject(error)
    }
}

// export const request: Service.Http = {
//     get(url, params, config?: InternalAxiosInternalAxiosRequestConfig) {
//         return new Promise((resolve, reject) => {
//             NProgress.start()
//             httpClient
//                 .get(url, { params })
//                 .then((res) => {
//                     NProgress.done()
//                     resolve(res.data)
//                 })
//                 .catch((err) => {
//                     NProgress.done()
//                     reject(err.data)
//                 })
//         })
//     },
//     post(url, params?, config?: InternalAxiosInternalAxiosRequestConfig) {
//         return new Promise((resolve, reject) => {
//             NProgress.start()
//             httpClient
//                 .post(url, JSON.stringify(params))
//                 .then((res) => {
//                     NProgress.done()
//                     resolve(res.data)
//                 })
//                 .catch((err) => {
//                     NProgress.done()
//                     reject(err.data)
//                 })
//         })
//     },
//     put(url, params?, config?: InternalAxiosInternalAxiosRequestConfig) {
//         return new Promise((resolve, reject) => {
//             NProgress.start()
//             httpClient
//                 .put(url, JSON.stringify(params))
//                 .then((res) => {
//                     NProgress.done()
//                     resolve(res.data)
//                 })
//                 .catch((err) => {
//                     NProgress.done()
//                     reject(err.data)
//                 })
//         })
//     },
//     delete(url, config?: InternalAxiosInternalAxiosRequestConfig) {
//         return new Promise((resolve, reject) => {
//             NProgress.start()
//             httpClient
//                 .delete(url)
//                 .then((res) => {
//                     NProgress.done()
//                     resolve(res.data)
//                 })
//                 .catch((err) => {
//                     NProgress.done()
//                     reject(err.data)
//                 })
//         })
//     },
//     upload(url, formData: FormData, config?: InternalAxiosInternalAxiosRequestConfig) {
//         return new Promise((resolve, reject) => {
//             NProgress.start()
//             httpClient
//                 .post(url, formData, {
//                     ...config,
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         ...config?.headers,
//                     },
//                 })
//                 .then((res) => {
//                     NProgress.done()
//                     resolve(res.data)
//                 })
//                 .catch((err) => {
//                     NProgress.done()
//                     reject(err.data)
//                 })
//         })
//     },

// }
