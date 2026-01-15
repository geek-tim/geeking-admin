import { request } from '../http/index'

/**
 * POST /api/auth/login
 * @description: 用户登录
 */
export function login(params: Api.Auth.loginParam) {
    return request.post<Api.Auth.LoginResponse>('/auth/login', params)
}

export function getAuthMe() {
    return request.get<{ roles: Api.Role.base[]; userInfo: Api.User.Profile }>(
        '/auth/me',
    )
    // GET /api/v1/auth/me?fields=id,username,roles
}

/**
 * POST /api/auth/logout
 * @description: 用户登出
 */
export function logout() {
    return request.post<Api.Auth.LogoutResponse>('/auth/logout')
}

// 2.3 刷新Token接口
// POST /api/auth/refresh-token
export function refreshToken() {
    return request.post<Api.Auth.RefreshTokenResponse>('/auth/refresh-token')
}
