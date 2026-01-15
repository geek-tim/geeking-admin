import { http, HttpResponse } from 'msw'
import { collapseItemProps } from 'naive-ui'

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
}
