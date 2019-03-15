import request from '@/utils/request'

export function getUserList(params) {
  return request({
    // 请求后端的url地址
    url: '/api/users/',
    method: 'get',
    // parms一些参数如/api/users/?page=2, page=2就是从parms传进来的
    params
  })
}

export function getUser(userId) {
  return request({
    // 请求后端的url地址
    url: `/api/users/${userId}/`,
    method: 'get'
  })
}

export function modfiyUser(id, data) {
  return request({
    // 请求后端的url地址
    url: `/api/users/${id}/`,
    method: 'patch',
    data
  })
}

export function addUser(data) {
  return request({
    // 请求后端的url地址
    url: `/api/userReg/`,
    method: 'post',
    data
  })
}
