import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 代理配置
const proxyOptions = {
  // 开发环境
  development: {
    '/api': {
      target: 'https://api.pryun.vip',
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp('^/api'), ''),
    },
  },
  // 生产环境
  production: {
    '/api': {
      target: 'https://api.pryun.vip',
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp('^/api'), ''),
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL = '' } = loadEnv(mode, './')

  const base = VITE_BASE_URL ? `/${VITE_BASE_URL}/` : ''

  const outDir = `dist_${VITE_BASE_URL}`

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    base,
    build: { outDir },
    server: {
      host: '0.0.0.0', // 暴露本地服务到局域网
      proxy: proxyOptions[mode],
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
  }
})
