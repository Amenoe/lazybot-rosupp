import axios from 'axios'
const request = axios.create({
  baseUrl: 'https://osu.ppy.sh',
  timeout: 10000,
  withCredentials: false // 跨域请求是否携带cookie
})

// 创建请求拦截
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    console.log('响应结果', res)
    return res
  },
  (error) => {
    Promise.reject(error)
  }
)

// export default {
//   get: (option) => {
//     return request({ method: 'get', ...option })
//   }
// }

export default request
