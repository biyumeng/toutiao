// 封装一个axios
import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 执行请求成功
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config // 表示会用该config请求进行后台操作
}, function () {
  // 执行请求失败
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function () {

})

export default axios
