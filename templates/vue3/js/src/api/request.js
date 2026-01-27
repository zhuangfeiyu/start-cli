import axios from 'axios'
import { AXIOS_TIMEOUT } from '@/constants/index'
import { useAuthStore } from '@/stores/auth-store'
import { ElMessage } from 'element-plus'
// import router from '@/router'

const authStore = useAuthStore()

// 创建 axios 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  timeout: AXIOS_TIMEOUT,
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证头
    const token = authStore.getToken()
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
      ElMessage.error(data.message || '请求失败')
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
          ElMessage.error('认证失败，请重新登录')
          authStore.clearToken()
          // 跳转401
          // router.push('/401')
          break
        case 403:
          ElMessage.error('权限不足')
          // router.push('/401')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          // router.push('/404')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          // router.push('/500')
          break
        default:
          ElMessage.error(data?.message || '请求失败')
      }
    } else if (error.request) {
      ElMessage.error('网络错误，请检查网络连接')
    } else {
      ElMessage.error('请求配置错误')
    }

    return Promise.reject(error)
  },
)

export default api
