import http from '@/api/core/request'
import type { AxiosRequestConfig } from 'axios'
// 示例
export const getTest = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/ydy-api/users-get?size=5',
    ...options,
  })
}
