/** 请求的相关类型 */
declare namespace Service {
    type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
    interface Http {
        get<T>(url: string, params?: unknown): Promise<ResType<T>>
        post<T>(url: string, params?: unknown): Promise<ResType<T>>
        put<T>(url: string, params?: unknown): Promise<ResType<T>>
        delete<T>(url: string, params?: unknown): Promise<ResType<T>>
        upload<T>(url: string, params: unknown): Promise<ResType<T>>
        download(url: string): void
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
