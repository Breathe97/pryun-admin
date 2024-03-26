import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ProxyOptions } from 'vite'

type Type_mode_keys = 'development' | 'production' // 定义当前环境

type ProxyObject = Partial<Record<Type_mode_keys, { [key: string]: ProxyOptions }>> // 问就是网上抄的

// 代理配置
const proxyObject: ProxyObject = {
  // 开发环境
  development: {
    '/api-admin-dev': {
      target: 'https://testgateway.api.huabeistore.com',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp('^/api-admin-dev'), ''),
    },
  },
  // 生产环境
  production: {
    '/api-admin-pro': {
      target: 'https://api.pryun.vip',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp('^/api-admin-pro'), ''),
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:mode`, mode)

  // 根据不同的环境获取不同的base_path
  const { VITE_BASE_PATH = '' } = loadEnv(mode, './')

  const base = VITE_BASE_PATH ? `/${VITE_BASE_PATH}/` : ''

  const outDir = `dist_${VITE_BASE_PATH}` // 打包路径的命名区分

  return {
    plugins: [vue()],
    base,
    build: { outDir },
    server: {
      host: '0.0.0.0', // 暴露本地服务到局域网
      proxy: proxyObject[mode as Type_mode_keys],
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
  }
})
