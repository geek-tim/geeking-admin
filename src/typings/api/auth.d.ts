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

    namespace Auth {
        /**
         * 登出接口响应
         */
        interface LogoutResponse {
            logoutTime: string
        }

        interface LoginResponse {
            token: string
            refreshToken: string
            tokenType: string
            expiresIn: number
            userInfo: Api.Login.Info
        }
        /**
         * 刷新Token接口响应
         **/
        interface RefreshTokenResponse {
            token: string
            refreshToken: string
            tokenType: string
            expiresIn: number
        }

        interface permission {
            label: string
            value: string
        }

        interface loginParam {
            username: string
            password: string
            verifyCode?: string
            isRemembered?: boolean
        }
    }
}
