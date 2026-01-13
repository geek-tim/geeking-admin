import { request } from '../http/index'

/* get方法测试 */
export function fetchGet(params?: any) {
    return request.get('/getAPI', { params })
}

/* post方法测试 */
export function fetchPost(data: any) {
    return request.post('/postAPI', data)
}
/* formPost方法测试 */
export function fetchFormPost(data: any) {
    const methodInstance = request.post('/postFormAPI', data)
    // methodInstance.meta = {
    //     isFormPost: true,
    // }
    return methodInstance
}
/* delete方法测试 */
export function fetchDelete() {
    return request.delete('/deleteAPI')
}
/* put方法测试 */
export function fetchPut(data: any) {
    return request.put('/putAPI', data)
}
/* 不携带token的接口 */
export function withoutToken() {
    const methodInstance = request.get('/getAPI')
    return methodInstance
}
/* 接口数据转换 */
export function dictData() {
    // return request.get('/getDictData', {
    //     transform(rawData, _headers) {
    //         const response = rawData as any
    //         return {
    //             ...response,
    //             data: {
    //                 ...response.data,
    //                 gender: response.data.gender === 0 ? '男' : '女',
    //                 status: `状态是${response.data.status}`,
    //             },
    //         }
    //     },
    // })
}
/* 模拟获取二进制文件 */
export function getBlob(url: string) {
    // const methodInstance = blankInstance.Get<Blob>(url)
    // methodInstance.meta = {
    //     // 标识为blob数据
    //     isBlob: true,
    // }
    // return methodInstance
}

/* 带进度的下载文件 */
export function downloadFile(url: string) {
    // const methodInstance = blankInstance.Get<Blob>(url)
    // methodInstance.meta = {
    //     // 标识为blob数据
    //     isBlob: true,
    // }
    // return methodInstance
}
/* 测试状态码500失败 */
export function FailedRequest() {
    return request.get('/serverError')
}

/* 测试业务码500失败 */
export function FailedResponse() {
    return request.post('/businessError')
}
/* 测试业务码10000失败,无提示 */
export function FailedResponseWithoutTip() {
    return request.post('/businessErrorWithoutTip')
}
/* token失效的接口 */
export function expiredTokenRequest() {
    return request.get('/expiredToken')
}
/* 测试token刷新接口 */
export function refreshToken() {
    return request.get('/updataToken')
}
