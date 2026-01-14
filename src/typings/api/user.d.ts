namespace Api {
    namespace User {
        interface Profile {
            id: number
            name: string
            nickname: string
            realName?: string
            avatar?: string
            email?: string
            phone?: string
            gender?: Gender
            birthday?: string
            departmentId?: number
            departmentName?: string
            position?: string
            status: CommonStatus
            createTime: string
            updateTime?: string
            lastLoginTime?: string
            lastLoginIp?: string
        }
    }
}
