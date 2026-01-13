import { http, HttpResponse } from 'msw'

export const auths = [
    // 用户认证接口
    http.post('/api/auth/login', async ({ request }) => {
        const { username, password } = await request.json()
        if (username === 'admin' && password === '123456') {
            return HttpResponse.json({
                code: 0,
                data: {
                    token: 'mock-jwt-token',
                    refreshToken: 'mock-jwt-token',
                    tokenType: 'Bearer',
                    expiresIn: 3600,
                    // user: { id: 1, username: 'admin', role: 'admin' },
                    // id: number
                    // /** 用户角色类型 */
                    // role: Entity.RoleType[]
                    // /** 访问token */
                    // accessToken: string
                    // /** 访问token */
                    // refreshToken: string
                },
                message: '登录成功',
            })
        }
        return HttpResponse.json({ error: '用户名或密码错误' }, { status: 401 })
    }),
]
