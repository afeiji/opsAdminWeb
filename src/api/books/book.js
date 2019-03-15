import request from '@/utils/request'

export function getBooksList(params) {
  return request({
    url: '/api/book/',
    method: 'get',
    params
  })
}

export function createBooks(data) {
  return request({
    url: '/api/book/',
    method: 'post',
    data
  })
}

export function updateBooks(id, data) {
  return request({
    url: `/api/book/${id}/`,
    method: 'put',
    data
  })
}

export function deleteBooks(id) {
  return request({
    url: `/api/book/${id}/`,
    method: 'delete'
  })
}

