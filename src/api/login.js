import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/UserInfo/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
