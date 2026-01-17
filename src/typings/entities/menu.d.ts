/* 角色数据库表字段 */
namespace Entity {
    type MenuType = 'dir' | 'page'
    interface Menu {
        name: string
        path: string
        title: string
        requiresAuth: boolean
        icon: string
        menuType: MenuType
        componentPath: string
        id: number
        pid: number
    }
}
