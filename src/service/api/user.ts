import { request } from '../http/index'

/**
 * 获取用户列表
 * @param params - 分页参数，包含页码、每页数量等信息
 * @returns 返回一个Promise，解析为分页的用户列表数据
 */
export function getUserList(params: Service.PaginationParams) {
    return request.get<Service.PaginationResponse<Entity.User>>(
        '/users',
        params,
    )
}

/**
 * 更新用户信息
 * @param data - 需要更新的用户数据，使用Partial类型表示只更新部分字段
 * @returns 返回一个Promise，解析为更新后的用户信息
 */
export function updateUser(data: Partial<Entity.User>) {
    return request.put<Entity.User>('/users/' + data.id, data)
}

/**
 * 删除指定用户
 * @param userId - 要删除的用户ID
 * @returns 返回一个HTTP请求的Promise对象，包含删除操作的结果
 */
export function deleteUser(userId: number) {
    return request.delete('/users/' + userId) // 发送DELETE请求到指定用户ID的接口
}

/**
 * GET /api/user/profile
 * 获取用户信息响应
 */

export type GetUserProfileResponse = {
    user: Api.User.Profile
    roles: string[]
    permissions: string[]
}

export function getUserProfile() {
    return request.get<GetUserProfileResponse>('/users/profile')
}

export function assignRoles(userId: number, roleIds: number[]) {
    return request.post('/users/' + userId + '/roles', roleIds)
}

export function getUserRoutes(userId: number) {
    return request.get('/users/' + userId + '/routes')
}

export function fetchUserRoutes(params: { id: number }) {
    return request.get<AppRoute.RowRoute[]>('/getUserRoutes', { params })
}
