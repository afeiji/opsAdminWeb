import request from '@/utils/request'

// 获取工单列表
export function workordersList(params) {
  return request({
    url: '/api/workorder/',
    method: 'get',
    params
  })
}

// 创建工单
export function createworkorders(data) {
  return request({
    url: '/api/workorder/',
    method: 'post',
    data
  })
}

// 更新工单
export function updateworkorders(id, data) {
  return request({
    url: `/api/workorder/${id}/`,
    method: 'patch',
    data
  })
}

// 删除工单，没用上，使用更新替代了
export function deleteworkorders(id) {
  return request({
    url: `/api/workorder/${id}/`,
    method: 'delete'
  })
}
