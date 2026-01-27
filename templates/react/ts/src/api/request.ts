import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { message } from 'antd'

import { AXIOS_TIMEOUT, RESPONSE_CODE } from '@/constants'
import { getToken, clearTokenFromStorage } from '@/stores/auth-store'

interface ApiResponse<T = unknown> {
  code?: number
  message?: string
  data?: T
  [key: string]: unknown
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  timeout: AXIOS_TIMEOUT,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.AuthToken = `${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response
    if (data?.code && data.code !== RESPONSE_CODE.SUCCESS) {
      const errorMessage = data.message || '请求失败'
      message.error(errorMessage)
      return Promise.reject(new Error(errorMessage))
    }
    return data
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          message.error('认证失败，请重新登录')
          clearTokenFromStorage()
          break
        case 403:
          message.error('权限不足')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default: {
          const errorMessage = data?.message || '请求失败'
          message.error(errorMessage)
        }
      }
    } else if (error.request) {
      message.error('网络错误，请检查网络连接')
    } else {
      message.error('请求配置错误')
    }

    return Promise.reject(error)
  },
)

export type { ApiResponse }
export default api
