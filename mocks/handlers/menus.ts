import { http, HttpResponse } from 'msw'

// 路由数据数组
const mockRoutes: AppRoute.Route[] = [
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     componentPath: 'LAYOUT',
    //     redirect: '/dashboard/workbench',
    //     meta: {
    //         // icon: 'DashboardOutlined',
    //         title: 'Dashboard',
    //     },
    //     children: [
    //         {
    //             path: 'console',
    //             name: 'dashboard_console',
    //             componentPath: '/dashboard/console/index.vue',
    //             meta: {
    //                 title: '主控台',
    //             },
    //         },
    //         {
    //             path: 'monitor',
    //             name: 'dashboard_monitor',
    //             componentPath: '/dashboard/monitor/index.vue',
    //             meta: {
    //                 title: '监控页',
    //             },
    //         },
    //         {
    //             path: 'workbench',
    //             name: 'dashboard_workbench',
    //             componentPath: '/dashboard/workbench/index.vue',
    //             meta: {
    //                 title: '工作台',
    //             },
    //         },
    //     ],
    // },
]

export const menus = [
    http.get('/api/menus/accessible', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        console.log('accessiable', authHeader)
        if (authHeader === 'Bearer mock-jwt-token') {
            return HttpResponse.json({
                code: 0,
                data: mockRoutes,
                message: '获取菜单信息成功',
            })
        }
        return HttpResponse.json({ code: -1, error: '未授权' }, { status: 401 })
    }),
]
