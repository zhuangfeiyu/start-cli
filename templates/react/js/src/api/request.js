import axios from 'axios'
import { message } from 'antd'
import { AXIOS_TIMEOUT } from '@/constants/index'
import { getToken, clearTokenFromStorage } from '@/stores/auth-store'
// import { useNavigate } from 'react-router-dom'

// 创建 axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  timeout: AXIOS_TIMEOUT,
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证头
    const token = getToken()
    if (token) {
      config.headers.AuthToken = `${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response

    // 处理业务错误
    if (data.code && data.code !== RESPONSE_CODE.SUCCESS) {
      message.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }

    return data
  },
  (error) => {
    // 处理 HTTP 错误
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          message.error('认证失败，请重新登录')
          clearTokenFromStorage()
          // 跳转401
          // const navigate = useNavigate()
          // navigate('/401')
          break
        case 403:
          message.error('权限不足')
          // navigate('/401')
          break
        case 404:
          message.error('请求的资源不存在')
          // navigate('/404')
          break
        case 500:
          message.error('服务器内部错误')
          // navigate('/500')
          break
        default:
          message.error(data?.message || '请求失败')
      }
    } else if (error.request) {
      message.error('网络错误，请检查网络连接')
    } else {
      message.error('请求配置错误')
    }

    return Promise.reject(error)
  },
)

export default api
