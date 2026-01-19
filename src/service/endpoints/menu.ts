import { request } from '../http/index'

export function getMenuList(format: string = 'flat') {
    // TODO flat/tree
    return request.get<Service.PaginationResponse<Entity.Menu>>('/menus/')
}
