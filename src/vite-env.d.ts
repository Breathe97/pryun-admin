/// <reference types="vite/client" />
// import vite from 'vite'

declare module 'vite' {
  type UserConfig = {
    mode?: 'development' | 'production' // 定义当前环境
  }
  export { UserConfig }
}

interface ImportMetaEnv {
  readonly VITE_BASE: string // 默认接口地址
  readonly VITE_BASE_PATH: string // 全局前置路径
  // 更多环境变量...
}

declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const Component: defineComponent<{}, {}, any>
  export default Component
}
declare module '*.js'
declare module '*.mjs'
declare interface Window {}
