import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // headers:{
  //     Authorization:"bearer "+JSON.parse(window.sessionStorage.getItem("hm_toutiao")).token
  // }
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = window.sessionStorage.getItem('hm_toutiao')
  if (user) {
    config.headers = {
      Authorization: 'bearer ' + JSON.parse(user).token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么

  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
