import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

// 增加用户
export const usersPost = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/users-post',
    ...options,
  })
}
// 删除用户
export const usersDelete = (options?: AxiosRequestConfig) => {
  return http({
    method: 'DELETE',
    url: '/users-delete',
    ...options,
  })
}
// 查询用户
export const usersGet = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/users-get',
    ...options,
  })
}
// 修改用户
export const usersPut = (options?: AxiosRequestConfig) => {
  return http({
    method: 'PUT',
    url: '/users-put',
    ...options,
  })
}
// 查询用户详情
export const usersGetInfo = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/supply/user/info',
    showErrMsg: false,
    ...options,
  })
}
// 查询用户路由
export const usersGetRoute = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/supply/menu/route',
    ...options,
  })
}
