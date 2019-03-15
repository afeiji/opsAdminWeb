import request from '@/utils/request'

// 获取上线列表
export function releaseList(params) {
  return request({
    url: '/api/release/',
    method: 'get',
    params
  })
}

// 创建上线单
export function createrelease(data) {
  return request({
    url: '/api/release/',
    method: 'post',
    data
  })
}

// 更新上线单
export function updaterelease(id, data) {
  return request({
    url: `/api/release/${id}/`,
    method: 'patch',
    data
  })
}

// 获取指定上线单
export function detailrelease(id, params) {
  return request({
    url: `/api/release/${id}/`,
    method: 'get',
    params
  })
}
