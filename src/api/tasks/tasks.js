import request from '@/utils/request'

export function autoaskList(params) {
  return request({
    url: '/api/task/',
    method: 'get',
    params
  })
}

export function createautoask(data) {
  return request({
    url: '/api/task/',
    method: 'post',
    data
  })
}

// 执行任务
export function updateautoask(id, data) {
  return request({
    url: '/api/task/' + id + '/',
    method: 'patch',
    data
  })
}

// 任务详情
export function detailautoask(id) {
  return request({
    url: '/api/task/' + id + '/',
    method: 'get'
  })
}
