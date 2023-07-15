import * as userApi from '@/api/user'
import * as authApi from '@/api/auth'
import { defineStore } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

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
      const res = await userApi.usersGetInfo()
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
