import { request } from '../http/index'

interface Ilogin {
    username: string
    password: string
}

export function fetchLogin(data: Ilogin) {
    const methodInstance = request.post<
        Service.ResType<Api.Auth.LoginResponse> & {
            roles: string[]
            userInfo: Api.Login.Info
        }
    >('/auth/login', data)
    return methodInstance
}
export function fetchUpdateToken(data: any) {
    const method = request.post<Service.ResType<Api.Login.Info>>(
        '/auth/updateToken',
        data,
    )
    return method
}

export function fetchUserRoutes(params: { id: number }) {
    return request.get<Service.ResType<AppRoute.RowRoute[]>>(
        '/auth/getUserRoutes',
        {
            params,
        },
    )
}
