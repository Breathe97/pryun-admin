import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取当前环境配置
  const config = loadEnv(mode, './')

  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:当前环境：`, `[${mode}]`)
  console.log(config)

  const { VITE_BASE = '', VITE_BASE_PATH = '' } = config

  const base = `/${VITE_BASE_PATH}`

  const proxy = {
    [`/api-${VITE_BASE_PATH}`]: {
      target: VITE_BASE,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^/api-${VITE_BASE_PATH}`), ''),
    },
  }

  return {
    plugins: [vue()],
    base,
    server: {
      host: '0.0.0.0', // 暴露本地服务到局域网
      proxy,
    },
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
  }
})
