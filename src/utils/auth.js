import Cookies from 'js-cookie'
import store from '../store'
const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 这个被导入到组件里面，然后传值拿去验证
export function checkPermission(perm) {
  // 下面三行我新加的，权限有问题去掉
  if (!perm) {
    return true
  }
  // indexOf就是从我传过来的perm数组去找,>-1表示找到了，找到了返回true，否则返回false
  if (store.getters.permission.indexOf(perm) > -1) {
    return true
  }
  return false
}
