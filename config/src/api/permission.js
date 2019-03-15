import request from '@/utils/request'

export function getPermissionList(params) {
  return request({
    // 请求后端的url地址
    url: '/api/permission/',
    method: 'get',
    // parms一些参数如/api/permission/?page=2, page=2就是从parms传进来的
    params
  })
}

export function getGroupPermissionList(gid, params) {
  return request({
    // 请求后端的url地址
    url: `/api/groupPermission/${gid}/`,
    method: 'get',
    // parms一些参数如/api/permission/?page=2, page=2就是从parms传进来的
    params
  })
}

export function updateGroupPermissionList(gid, data) {
  return request({
    // 请求后端的url地址
    url: `/api/groupPermission/${gid}/`,
    method: 'patch',
    // parms一些参数如/api/permission/?page=2, page=2就是从parms传进来的
    data
  })
}
