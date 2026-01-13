import { http, HttpResponse, delay } from 'msw'

export const users = [
    http.get('/api/users/profile', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        console.log('authHeader', authHeader)
        if (authHeader === 'Bearer mock-jwt-token') {
            return HttpResponse.json({
                code: 0,
                data: {
                    user: {
                        id: 1,
                        username: 'admin',
                        nickname: 'admin',
                        // realName?: string
                        // avatar?: string
                        // email?: string
                        // phone?: string
                        // gender?: Gender
                        // birthday?: string
                        // departmentId?: number
                        // departmentName?: string
                        // position?: string
                        status: 1,
                        createTime: new Date().toISOString(),
                        // updateTime?: string
                        // lastLoginTime?: string
                        // lastLoginIp?: string
                    },
                    roles: ['admin'],
                    permissions: [],
                },
                message: '获取用户信息成功',
            })
        }
        return HttpResponse.json({ code: -1, error: '未授权' }, { status: 401 })
    }),
]
