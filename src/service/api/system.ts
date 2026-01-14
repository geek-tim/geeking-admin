import { request } from '../http/index'

// 获取所有路由信息
export function fetchAllRoutes() {
    return request.get<AppRoute.RowRoute[]>('/getUserRoutes')
}

// 获取所有角色列表
export function fetchRoleList() {
    // return request.get<Entity.Role[]>('/role/list')
}

/**
 * 请求获取字典列表
 *
 * @param code - 字典编码，用于筛选特定的字典列表
 * @returns 返回的字典列表数据
 */
export function fetchDictList(code?: string) {
    const params = { code }
    return request.get<Entity.Dict[]>('/dict/list', {
        params,
    })
}
