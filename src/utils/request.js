// 封装一个axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 执行请求成功
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config // 表示会用该config请求进行后台操作
}, function () {
  // 执行请求失败
})

axios.defaults.transformResponse = [function (data) {
  let result = JSONBig.parse(data) // 解决js处理大数字失帧问题
  return result
}]

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时
  return response.data ? response.data : {}
}, function (error) {
  // 失败时
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期或失效
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })// 提示信息显示
  return Promise.reject(error) // 只要reject 就会到catch中
})

export default axios
