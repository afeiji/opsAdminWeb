import axios from 'axios'
import { Message } from 'element-ui'
// import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import route from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'JWT ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    return response.data
  },
  error => {
    if (!error.response) {
      Message.error('系统错误')
    } else if (error.response.status === 401) {
      // 先退出，然后跳登陆页
      store.dispatch('FedLogOut').then(() => {
        route.push({ path: '/login' })
      })
    } else if (error.response.status === 403) {
      Message({
        message: '权限拒绝',
        type: 'error',
        // 延迟500毫秒
        duration: 800,
        // 回调，让它去首页
        onClose: function() {
          route.push({ path: '/login' })
        }
      })
    } else if (error.response.status === 400) {
      Message({
        message: '认证失败，用户名或密码错误',
        type: 'error'
      })
    } else if (error.response.status === 500) {
      Message({
        message: '服务器内部错误',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default service
