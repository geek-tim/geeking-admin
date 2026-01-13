/// <reference path="../global.d.ts"/>

/* 角色数据库表字段 */
namespace Entity {
    type RoleType = 'super' | 'admin' | 'user'

    // interface Role {
    //   /** 用户id */
    //   id?: number;
    //   /** 用户名 */
    //   role?: RoleType;
    // }
    //   interface Role {
    //   id: number
    //   // 角色代码（唯一标识，如：admin、editor、viewer）
    //   code: string
    //   name: string
    //   description?: string
    //   // 是否系统内置角色（不可删除）
    //   isSystem?: boolean
    //   // 关联的权限ID列表
    //   permissionIds: number[]
    //   // 关联的菜单ID列表
    //   menuIds: number[]
    //   createdAt: Date
    //   updatedAt: Date
    // }
}
