/// <reference path="../global.d.ts"/>

/** 用户数据库表字段 */
namespace Entity {
    interface User {
        // /** 用户id */
        // id?: number
        // /** 用户名 */
        // userName?: string
        // /* 用户头像 */
        // avatar?: string
        // /* 用户性别 */
        // gender?: 0 | 1
        // /* 用户邮箱 */
        // email?: string
        // /* 用户昵称 */
        // nickname?: string
        // /* 用户电话 */
        // tel?: string
        // /** 用户角色类型 */
        // role?: Entity.RoleType[]
        // /** 用户状态 */
        // status?: 0 | 1
        // /** 备注 */
        // remark?: string
        id: number
        uuid?: string // 全局唯一标识，用于对外暴露
        username: string
        email: string
        phone?: string
        avatar?: string
        nickname?: string
        realName?: string // 真实姓名
        gender?: 'male' | 'female' | 'unknown'
        birthday?: string // ISO 8601 格式日期，例如 '1990-01-01'
        status: UserStatus // 用户状态枚举
        role: UserRole | UserRole[] // 用户角色，可以是单个或多个
        departmentId?: number
        departmentName?: string
        position?: string // 职位
        lastLoginAt?: string // 上次登录时间
        lastLoginIp?: string // 上次登录IP
        createdAt: string
        updatedAt: string
        createdBy?: number // 创建人ID
        updatedBy?: number // 更新人ID

        // 扩展字段（可根据业务需要添加）
        extensions?: Record<string, any>
    }
}
