import request from '@/utils/request'

export function getPulishList(params) {
  return request({
    url: '/api/publish/',
    method: 'get',
    params
  })
}

export function createPublish(data) {
  return request({
    url: '/api/publish/',
    method: 'post',
    data
  })
}

export function updatePublish(id, data) {
  return request({
    url: `/api/publish/${id}/`,
    method: 'put',
    data
  })
}

export function deletePublish(id) {
  return request({
    url: `/api/publish/${id}/`,
    method: 'delete'
  })
}

