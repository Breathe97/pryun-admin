import * as userApi from '@/api/modules/user'
import * as authApi from '@/api/modules/auth'
import { defineStore } from 'pinia'

// 系统相关的
export const StoreUser = defineStore('StoreUser', {
  // 持久化列表
  persist: [
    {
      paths: ['token'],
      storage: localStorage,
    },
  ],
  state: () => {
    return {
      token: '',
      userInfo: {},
    }
  },
  actions: {
    setToken(token: string) {
      this['token'] = token
    },
    // 获取用户信息
    async usersGetInfo() {
      const res = await userApi.usersGetInfo({ showErrMsg: true })
      const { code = 0, msg, data } = res
      if (code === 200) {
        this['userInfo'] = data
      } else {
        throw res
      }
    },
    // 注销登录
    logout() {
      return authApi.logout()
    },
  },
})
