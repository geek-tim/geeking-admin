// export * from './response'

import type { AxiosInstance } from 'axios'
import { RequestInterceptor } from './request'
import { ResponseInterceptor } from './response'

export function setupInterceptors(instance: AxiosInstance) {
    const requestInterceptor = new RequestInterceptor()
    const responseInterceptor = new ResponseInterceptor()

    // 请求拦截器
    instance.interceptors.request.use(
        requestInterceptor.onFulfilled.bind(requestInterceptor),
        requestInterceptor.onRejected.bind(requestInterceptor),
    )

    // 响应拦截器
    instance.interceptors.response.use(
        responseInterceptor.onFulfilled.bind(responseInterceptor),
        responseInterceptor.onRejected.bind(responseInterceptor),
    )

    return instance
}
