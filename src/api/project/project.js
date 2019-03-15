import request from '@/utils/request'

export function projectList(params) {
  return request({
    url: '/project/list/',
    method: 'get',
    params
  })
}

export function projectTagList(params) {
  return request({
    url: '/project/tag/',
    method: 'get',
    params
  })
}
