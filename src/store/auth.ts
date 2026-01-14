import { router } from '@/router'
import { login as fetchLogin, getAuthMe } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthState {
    userInfo: Api.User.Profile | null
    token: string
    tokenType: string
}
export const useAuthStore = defineStore('auth-store', {
    state: (): AuthState => {
        return {
            userInfo: local.get('userInfo'),
            token: local.get('accessToken') || '',
            tokenType: local.get('tokenType') || '',
        }
    },
    getters: {
        /** 是否登录 */
        isLogin(state) {
            return Boolean(state.token)
        },
    },
    actions: {
        /* 登录退出，重置用户信息等 */
        async logout() {
            const route = unref(router.currentRoute)
            // 清除本地缓存
            this.clearAuthStorage()
            // 清空路由、菜单等数据
            const routeStore = useRouteStore()
            routeStore.resetRouteStore()
            // 清空标签栏数据
            const tabStore = useTabStore()
            tabStore.clearAllTabs()
            // 重置当前存储库
            this.$reset()
            // 重定向到登录页
            if (route.meta.requiresAuth) {
                router.push({
                    name: 'login',
                    query: {
                        redirect: route.fullPath,
                    },
                })
            }
        },
        clearAuthStorage() {
            local.remove('accessToken')
            local.remove('refreshToken')
            local.remove('userInfo')
        },

        /* 用户登录 */
        async login(username: string, password: string) {
            try {
                const { code, data } = await fetchLogin({
                    username,
                    password,
                })
                if (code != 200) return

                // 处理登录信息
                await this.handleLoginInfo(data)
            } catch (e) {
                console.warn('[Login Error]:', e)
            }
        },

        /* 处理登录返回的数据 */
        async handleLoginInfo(loginResponse: Api.Auth.LoginResponse) {
            // 将token和userInfo保存下来
            local.set('accessToken', loginResponse.token)
            local.set('tokenType', loginResponse.tokenType)
            local.set('refreshToken', loginResponse.refreshToken)
            this.token = loginResponse.token

            const { code, data } = await getAuthMe()
            this.userInfo = data.userInfo
            local.set('userInfo', data.userInfo)

            // 添加路由和菜单
            const routeStore = useRouteStore()
            await routeStore.initAuthRoute()

            // 进行重定向跳转
            const route = unref(router.currentRoute)
            const query = route.query as { redirect: string }
            router.push({
                path: query.redirect || '/',
            })
        },
    },
})
