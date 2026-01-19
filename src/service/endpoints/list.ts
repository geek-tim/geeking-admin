import { request } from '../http/index'

export function fetchUserList() {
    return request.get('/userList')
}
