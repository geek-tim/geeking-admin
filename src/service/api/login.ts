import { request } from '../http'

interface Ilogin {
    userName: string
    password: string
}

export function fetchLogin(data: Ilogin) {
    const methodInstance = request.Post<Service.ResType<Api.Login.Info>>(
        '/login',
        data,
    )
    methodInstance.meta = {
        authRole: null,
    }
    return methodInstance
}
export function fetchUpdateToken(data: any) {
    const method = request.Post<Service.ResType<Api.Login.Info>>(
        '/updateToken',
        data,
    )
    method.meta = {
        authRole: 'refreshToken',
    }
    return method
}

export function fetchUserRoutes(params: { id: number }) {
    return request.Get<Service.ResType<AppRoute.RowRoute[]>>('/getUserRoutes', {
        params,
    })
}
