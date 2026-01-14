namespace Api {
    namespace Role {
        interface base {
            id: number
            name: string
            description: string
            permissions?: number[]
            createTime: string
            updateTime: string
        }

        interface RoleListResponse {
            list: Role[]
            total: number
        }

        interface RoleCreateRequest {
            name: string
            description: string
            permissions: number[]
        }

        interface RoleUpdateRequest {
            id: number
            name: string
            description: string
            permissions: number[]
        }
    }
}
