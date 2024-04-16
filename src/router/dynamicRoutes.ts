import type { RouteRecordRaw } from 'vue-router'
import { icons } from './icon'

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    name: 'test',
    path: '/test',
    redirect: '/test/test-index',
    meta: { icons: [icons.share_fill], title: '开发示例' },
    children: [
      {
        name: 'test-index',
        path: '/test/test-index',
        component: () => import('@/views/test/test-index.vue'),
        meta: {
          icons: [icons.share_fill],
          title: '基本示例',
        },
      },
      {
        name: 'test-table',
        path: '/test/test-table',
        component: () => import('@/views/test/test-table.vue'),
        meta: {
          icons: [icons.share_fill],
          title: '表格示例',
        },
      },
      {
        name: 'test-details',
        path: '/test/test-details',
        component: () => import('@/views/test/test-details.vue'),
        meta: {
          icons: [icons.set],
          title: '详情',
          hideInSider: '/test/test-index',
        },
      },
    ],
  },
  {
    name: 'workbench',
    path: '/workbench',
    meta: { icons: [icons.workbench], title: '工作台' },
    redirect: '/workbench/workbench-index',
    children: [
      {
        name: 'workbench-index',
        path: '/workbench/workbench-index',
        meta: {
          icons: [icons.workbench],
          title: '代办事项',
          showFooter: false,
        },
        component: () => import('../views/workbench/workbench-index.vue'),
      },
    ],
  },
  {
    name: 'apis',
    path: '/apis',
    meta: { icons: [icons.code], title: 'API管理' },
    redirect: '/apis/apis-index',
    children: [
      {
        name: 'apis-index',
        path: '/apis/apis-index',
        meta: {
          icons: [icons.code],
          title: 'API管理',
          showFooter: false,
        },
        component: () => import('../views/apis/apis-index.vue'),
      },
    ],
  },
  {
    name: 'datav',
    path: '/datav',
    meta: { icons: [icons.chart], title: '可视化大屏' },
    redirect: '/datav/datav-index',
    children: [
      {
        name: 'datav-index',
        path: '/datav/datav-index',
        meta: {
          icons: [icons.chart],
          title: '可视化大屏',
          showFooter: false,
        },
        component: () => import('../views/datav/datav-index.vue'),
      },
    ],
  },
  {
    name: 'users',
    path: '/users',
    meta: { icons: [icons.user], title: '用户管理' },
    redirect: '/users/users-index',
    children: [
      {
        name: 'users-brisk',
        path: '/users/users-brisk',
        meta: {
          icons: [icons.user],
          title: '活跃分析',
        },
        component: () => import('../views/users/users-brisk.vue'),
      },
      {
        name: 'users-index',
        path: '/users/users-index',
        meta: {
          icons: [icons.user],
          title: '用户列表',
        },
        component: () => import('../views/users/users-index.vue'),
      },
      {
        name: 'users-info',
        path: '/users/users-info',
        meta: {
          icons: [icons.user],
          title: '用户详情',
          hideInSider: '/users/users-info',
        },
        component: () => import('../views/users/users-info.vue'),
      },
    ],
  },
  {
    name: 'system',
    path: '/system',
    meta: { icons: [icons.set], title: '系统管理' },
    redirect: '/system/system-role',
    children: [
      {
        name: 'system-role',
        path: '/system/system-role',
        meta: {
          icons: [icons.user],
          title: '角色管理',
        },
        component: () => import('../views/system/system-role.vue'),
      },
      {
        name: 'system-permission',
        path: '/system/system-permission',
        meta: {
          icons: [icons.set],
          title: '权限管理',
        },
        component: () => import('../views/system/system-permission.vue'),
      },
      {
        name: 'system-theme',
        path: '/system/system-theme',
        meta: {
          icons: [icons.exterior],
          title: '系统主题',
        },
        component: () => import('../views/system/system-theme.vue'),
      },
      {
        name: 'system-log',
        path: '/system/system-log',
        meta: {
          icons: [icons.order],
          title: '系统日志',
        },
        component: () => import('../views/system/system-log.vue'),
      },
    ],
  },
]
