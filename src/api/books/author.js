import request from '@/utils/request'

export function getAuthorsList(params) {
  return request({
    url: '/api/author/',
    method: 'get',
    params
  })
}

export function createAuthors(data) {
  return request({
    url: '/api/author/',
    method: 'post',
    data
  })
}

export function updateAuthors(id, data) {
  return request({
    url: `/api/author/${id}/`,
    method: 'put',
    data
  })
}

export function deleteAuthors(id) {
  return request({
    url: `/api/author/${id}/`,
    method: 'delete'
  })
}

