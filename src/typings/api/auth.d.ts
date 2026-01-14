namespace Api {
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

        // interface permission {
        //     label: string
        //     value: string
        // }

        interface loginParam {
            username: string
            password: string
            verifyCode?: string
            captcha?: string
            remember?: boolean
        }
    }
}
