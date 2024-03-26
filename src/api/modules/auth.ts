import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

// 发送短信验证码
export const sendSmsCode = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/users-sendSmsCode',
    ...options,
  })
}

// 登录
export const login = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/users-login',
    ...options,
    showErrMsg: false,
  })
}

// 登出
export const logout = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/users-logout',
    ...options,
  })
}
