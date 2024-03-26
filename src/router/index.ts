import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { StoreSystem } from '@/store/system'

// 静态路由
// 静态路由不会校验权限如果没有找到路由会跳转到404、403
const routes: any = [
  {
    path: '/',
    redirect: '/users/users-index',
    meta: {
      keepAlive: false,
    },
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
      keepAlive: false,
    },
    component: () => import('@/views/login/login-index.vue'),
  },
  {
    path: '/:path(.*)',
    meta: {
      title: '页面找不到',
      keepAlive: false,
    },
    component: () => import('@/views/error/error-404.vue'),
  },
]

const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH

const router = createRouter({
  history: true ? createWebHistory(`/${VITE_BASE_PATH}`) : createWebHashHistory(`/${VITE_BASE_PATH}`), // 路由模式
  routes,
})

router.beforeEach(async (to, from, next) => {
  // 初始化系统数据
  const storeSystem = StoreSystem()
  try {
    const needReplace: any = await storeSystem.init(false) // 初始化系统store数据
    if (needReplace) return next({ ...to, replace: true })
  } catch (error) {
    // 不能正常初始化时重新登录
    return next('/login')
  }
  next()
})

router.afterEach((to, from) => {
  const storeSystem = StoreSystem()
  storeSystem.change()
})

export default router
