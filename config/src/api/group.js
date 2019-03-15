import request from '@/utils/request'

export function getGroupList(params) {
  return request({
    // 请求后端的url地址
    url: '/api/groups/',
    method: 'get',
    // parms一些参数如/api/users/?page=2, page=2就是从parms传进来的
    params
  })
}

export function modfiyGroup(gid, data) {
  return request({
    // 请求后端的url地址
    url: `/api/groups/${gid}/`,
    method: 'patch',
    data
  })
}

export function addGroup(data) {
  return request({
    // 请求后端的url地址
    url: '/api/groups/',
    method: 'post',
    data
  })
}

export function updateUserGroups(uid, data) {
  return request({
    // 请求后端的url地址
    url: `/api/userGroups/${uid}/`,
    method: 'patch',
    data
  })
}

export function getUserGroups(uid, params) {
  return request({
    // 请求后端的url地址
    url: `/api/userGroups/${uid}/`,
    method: 'get',
    params
  })
}

export function getGroupsMenbers(gid, params) {
  return request({
    // 请求后端的url地址
    url: `/api/groupMenbers/${gid}/`,
    method: 'get',
    params
  })
}

export function deleteGroupsMenbers(gid, data) {
  return request({
    // 请求后端的url地址
    url: `/api/groupMenbers/${gid}/`,
    method: 'delete',
    data
  })
}

