import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import NProgress from 'nprogress'
import { useAuthStore } from '@/store/auth'

const service = axios.create()
// 设置请求头和请求路径
service.defaults.baseURL = '/api/'
service.defaults.timeout = 10000
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// Request interceptors
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authStore = useAuthStore()
        if (authStore.token) {
            config.headers.Authorization = `${authStore.tokenType} ${authStore.token}`
        }
        return config
    },
    (error: any) => {
        Promise.reject(error)
    },
)

// Response interceptors
service.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.data.code === 111) {
            sessionStorage.setItem('token', '')
            // token过期操作
        }
        // do something
        return response
    },
    (error: any) => {
        // do something
        return Promise.reject(error)
    },
)

// export default service
export const request: Service.Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .get(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .put(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .delete(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}
