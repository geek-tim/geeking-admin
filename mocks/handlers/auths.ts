import { http, HttpResponse } from 'msw'
import { responseWrapper } from '../utils'
export const auths = [
    // 用户认证接口
    http.post('/api/auth/login', async ({ request }) => {
        // console.log('login', await request.json())
        const { username, password } = await request.json()
        if (username === 'super' && password === '123456') {
            return responseWrapper({
                token: 'mock-jwt-token', // JWT Token
                refreshToken: 'mock-jwt-token-refresh', // 刷新Token
                tokenType: 'Bearer', // Token类型
                expiresIn: 7200, // 过期时间（秒）
            })
        }
        return HttpResponse.json({ error: '用户名或密码错误' }, { status: 401 })
    }),
    http.post('/api/auth/me', async ({ request }) => {
        return responseWrapper({
            roles: [
                {
                    id: 1,
                    code: 'admin',
                    name: '超级管理员',
                    description: '系统最高权限角色',
                    // dataScope: 1,
                },
                {
                    id: 2,
                    code: 'dept_manager',
                    name: '部门经理',
                    description: '部门管理角色',
                    // dataScope: 2,
                },
            ],
            user: {
                userId: 1,
                username: 'admin',
                nickname: '管理员',
                avatar: 'https://example.com/avatar.jpg',
                email: 'admin@example.com',
                phone: '13800138000',
                status: 1, // 状态：1-正常 0-禁用
                lastLoginTime: '2023-05-26 10:00:00',
                lastLoginIp: '192.168.1.100',
            },
        })
    }),
]
