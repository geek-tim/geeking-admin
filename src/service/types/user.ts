// api/types/user.ts
/**
 * 用户状态枚举
 */
export enum UserStatus {
    ACTIVE = 'active', // 活跃
    INACTIVE = 'inactive', // 未激活
    DISABLED = 'disabled', // 禁用
    LOCKED = 'locked', // 锁定
    DELETED = 'deleted', // 已删除（逻辑删除）
}

/**
 * 用户角色枚举
 */
export enum UserRole {
    SUPER_ADMIN = 'super_admin', // 超级管理员
    ADMIN = 'admin', // 管理员
    EDITOR = 'editor', // 编辑
    VIEWER = 'viewer', // 查看者
    USER = 'user', // 普通用户
    GUEST = 'guest', // 访客
}

/**
 * 创建用户数据传输对象 (DTO)
 * 注意：这是前端发送给后端的类型，字段通常比 User 实体更少
 */
export interface CreateUserDto {
    // 必填字段（根据业务需求调整）
    username: string
    email: string
    password: string

    // 选填字段
    phone?: string
    avatar?: string
    nickname?: string
    realName?: string
    gender?: 'male' | 'female' | 'unknown'
    birthday?: string

    // 业务字段
    role?: UserRole | UserRole[] // 创建时分配的角色
    departmentId?: number
    position?: string

    // 扩展字段
    extensions?: Record<string, any>
}

/**
 * 更新用户数据传输对象 (DTO)
 * 通常所有字段都是可选的（使用 Patch 语义）
 */
export interface UpdateUserDto {
    // 基本信息（通常不可修改 username，但可修改邮箱）
    email?: string
    phone?: string
    avatar?: string
    nickname?: string
    realName?: string
    gender?: 'male' | 'female' | 'unknown'
    birthday?: string

    // 业务信息
    status?: UserStatus
    role?: UserRole | UserRole[]
    departmentId?: number
    position?: string

    // 密码相关（单独接口处理更安全，但这里也提供选项）
    password?: string
    oldPassword?: string // 修改密码时需要原密码

    // 扩展字段
    extensions?: Record<string, any>
}

/**
 * 用户查询参数（用于 GET /users 接口）
 */
export interface UserQueryParams extends Service.PaginationParams {
    // 搜索条件
    keyword?: string // 模糊搜索 username, email, nickname, realName
    username?: string // 精确匹配用户名
    email?: string // 精确匹配邮箱
    phone?: string // 精确匹配手机号

    // 过滤条件
    status?: UserStatus | UserStatus[] // 支持多状态筛选
    role?: UserRole | UserRole[] // 支持多角色筛选
    departmentId?: number | number[] // 支持多部门筛选
    gender?: 'male' | 'female' | 'unknown'

    // 时间范围
    createdAtStart?: string // 创建时间开始
    createdAtEnd?: string // 创建时间结束
    lastLoginStart?: string // 最后登录时间开始
    lastLoginEnd?: string // 最后登录时间结束

    // 排序
    sortBy?: 'id' | 'username' | 'email' | 'createdAt' | 'lastLoginAt'
    sortOrder?: 'asc' | 'desc'
}

/**
 * 用户登录请求 DTO
 */
export interface LoginDto {
    // 支持多种登录方式
    username?: string // 用户名登录
    email?: string // 邮箱登录
    phone?: string // 手机号登录

    password: string
    rememberMe?: boolean
    captcha?: string // 验证码
    captchaId?: string // 验证码ID
}

/**
 * 用户登录响应 DTO
 */
export interface LoginResponse {
    user: Entity.User
    token: string
    refreshToken?: string
    expiresIn: number // token 有效期（秒）
    tokenType?: string // 通常是 'Bearer'
}

/**
 * 修改密码 DTO
 */
export interface ChangePasswordDto {
    oldPassword: string
    newPassword: string
    confirmPassword?: string // 前端确认用
}

/**
 * 重置密码 DTO（管理员操作）
 */
export interface ResetPasswordDto {
    userId: number
    newPassword?: string // 如果为空，后端可生成随机密码
    sendEmail?: boolean // 是否发送邮件通知
}

/**
 * 批量操作用户 DTO
 */
export interface BatchUserOperationDto {
    userIds: number[] // 用户ID列表
    operation: 'enable' | 'disable' | 'delete' | 'assignRole' | 'moveDepartment'

    // 根据 operation 不同，可能有额外参数
    role?: UserRole
    departmentId?: number
    reason?: string // 操作原因
}

/**
 * 用户统计数据
 */
export interface UserStats {
    total: number
    active: number
    inactive: number
    disabled: number
    todayNew: number
    weekNew: number
    monthNew: number
    byRole: Record<UserRole, number>
    byDepartment: Array<{
        departmentId: number
        departmentName: string
        count: number
    }>
}
