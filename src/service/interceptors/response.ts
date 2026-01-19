import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/store/auth'
import NProgress from 'nprogress'

const message = useMessage()

export const handleAuthError = (errno: number) => {
    const authErrMap: any = {
        '10031': '登录失效，需要重新登录', // token 失效
        '10032': '您太久没登录，请重新登录~', // token 过期
        '10033': '账户未绑定角色，请联系管理员绑定角色',
        '10034': '该用户未注册，请联系管理员注册用户',
        '10035': 'code 无法获取对应第三方平台用户',
        '10036': '该账户未关联员工，请联系管理员做关联',
        '10037': '账号已无效',
        '10038': '账号未找到',
    }

    if (authErrMap.hasOwnProperty(errno)) {
        message.error(authErrMap[errno])
        // 授权错误，登出账户
        const authStore = useAuthStore()
        authStore.logout()
        return false
    }

    return true
}

export const handleGeneralError = (errno: number, errmsg: string) => {
    if (errno !== 0) {
        message.error(errmsg)
        return false
    }

    return true
}

export const handleNetworkError = (errStatus: number) => {
    let errMessage = '未知错误'
    if (errStatus) {
        switch (errStatus) {
            case 400:
                errMessage = '错误的请求'
                break
            case 401:
                errMessage = '未授权，请重新登录'
                break
            case 403:
                errMessage = '拒绝访问'
                break
            case 404:
                errMessage = '请求错误,未找到该资源'
                break
            case 405:
                errMessage = '请求方法未允许'
                break
            case 408:
                errMessage = '请求超时'
                break
            case 500:
                errMessage = '服务器端出错'
                break
            case 501:
                errMessage = '网络未实现'
                break
            case 502:
                errMessage = '网络错误'
                break
            case 503:
                errMessage = '服务不可用'
                break
            case 504:
                errMessage = '网络超时'
                break
            case 505:
                errMessage = 'http版本不支持该请求'
                break
            default:
                errMessage = `其他连接错误 --${errStatus}`
        }
    } else {
        errMessage = `无法连接到服务器！`
    }

    message.error(errMessage)
}

import type { AxiosResponse } from 'axios'

export class ResponseInterceptor {
    onFulfilled(response: AxiosResponse) {
        NProgress.done()
        // 1. 计算请求耗时
        const startTime = (response.config as any)._startTime
        if (startTime) {
            const duration = Date.now() - startTime
            console.debug(`请求 ${response.config.url} 耗时: ${duration}ms`)

            // 可发送到性能监控平台
            if (duration > 5000) {
                console.warn(
                    `请求 ${response.config.url} 耗时过长: ${duration}ms`,
                )
            }
        }

        // 2. 统一响应格式处理

        const { data } = response
        const code = data?.code ?? data?.status ?? response.status

        // 业务成功
        if (code === 200 || code === 'SUCCESS') {
            return response
        }

        handleAuthError(code)
        handleGeneralError(code, data?.message ?? data?.msg ?? '请求失败')

        // 抛出错误，让catch块处理
        return Promise.reject(response)
    }

    onRejected(error: any) {
        NProgress.done()
        // 网络错误处理
        if (!error.response) {
            if (error.code === 'ECONNABORTED') {
                message.error('请求超时，请检查网络连接')
            } else if (error.message === 'Network Error') {
                // message.error({
                //     title: '网络错误',
                //     message: '请检查网络连接后重试',
                //     duration: 5000,
                // })
                message.error('请检查网络连接后重试')
            } else {
                message.error('网络异常，请稍后重试')
            }
            return Promise.reject(error)
        }

        // HTTP状态码处理
        const status = error.response?.status
        handleNetworkError(status)

        return Promise.reject(error)
    }
}
