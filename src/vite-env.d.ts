/// <reference types="vite/client" />
// import vite from 'vite'

declare module 'vite' {
  type UserConfig = {
    mode?: 'development' | 'production' // 定义当前环境
  }
  export { UserConfig }
}

declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const Component: defineComponent<{}, {}, any>
  export default Component
}
declare module '*.js'
declare module '*.mjs'
declare interface Window {}
