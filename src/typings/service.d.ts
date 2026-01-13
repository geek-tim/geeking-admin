/** 请求的相关类型 */
declare namespace Service {
    import type { Method } from 'alova'

    interface AlovaConfig {
        baseURL: string
        timeout?: number
        beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
    }

    /** 后端接口返回的数据结构配置 */
    interface BackendConfig {
        /** 表示后端请求状态码的属性字段 */
        codeKey?: string
        /** 表示后端请求数据的属性字段 */
        dataKey?: string
        /** 表示后端消息的属性字段 */
        msgKey?: string
        /** 后端业务上定义的成功请求的状态 */
        successCode?: number | string
    }

    type ResType<T = any> = {
        /** 业务错误码参考接口设计 */
        code: number
        /** 返回的数据 */
        data: T
        /** 错误信息 */
        message: string
        timestamp: number
        traceId: string | number
    }

    interface BaseEntity {
        id: number | string // 主键
        createTime: string // 创建时间
        updateTime?: string // 更新时间
        createBy?: string // 创建人
        updateBy?: string // 更新人
        status?: number // 状态 (0:禁用, 1:启用)
    }

    // 分页参数
    interface PaginationParams {
        page?: number
        pageSize?: number
        sort?: string
        order?: 'asc' | 'desc'
    }

    // 分页响应
    interface PaginatedResponse<T> {
        data: T[]
        pagination: {
            page: number
            pageSize: number
            total: number
            totalPages: number
        }
    }
}
