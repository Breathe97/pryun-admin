import http from './core/http'
import type { AxiosRequestConfig } from 'axios'

// 示例
export const getTest = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/pryun-api/users-get?size=5',
    ...options,
  })
}

export const postTest = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/pryun-api/users-post',
    ...options,
  })
}
