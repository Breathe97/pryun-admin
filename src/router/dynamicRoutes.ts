import type { RouteRecordRaw } from 'vue-router'
import { icons } from './icon'

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    redirect: '/home/home-index',
    meta: { icons: [icons.share_fill], title: '首页' },
    children: [
      {
        name: 'home-index',
        path: '/home/home-index',
        component: () => import('@/views/home/home-index.vue'),
        meta: {
          icons: [icons.share_fill],
          title: '首页',
        },
      },
    ],
  },
  {
    name: 'dataSource',
    path: '/dataSource',
    redirect: '/dataSource/dataSource-index',
    meta: { icons: [icons.share_fill], title: '数据源' },
    children: [
      {
        name: 'dataSource-index',
        path: '/dataSource/dataSource-index',
        component: () => import('@/views/dataSource/dataSource-index.vue'),
        meta: {
          icons: [icons.share_fill],
          title: '数据源',
        },
      },
    ],
  },
  {
    name: 'dataIndex',
    path: '/dataIndex',
    meta: { title: '数据指标' },
    redirect: '/dataIndex/dataIndex-index',
    children: [
      {
        name: 'dataIndex-index',
        path: '/dataIndex/dataIndex-index',
        meta: {
          title: '指标可视化',
        },
        component: () => import('../views/dataIndex/dataIndex-index.vue'),
      },
    ],
  },
  {
    name: 'reportAnalysis',
    path: '/reportAnalysis',
    meta: { icons: [icons.chart], title: '报表分析' },
    redirect: '/reportAnalysis/reportAnalysis-index',
    children: [
      {
        name: 'reportAnalysis-index',
        path: '/reportAnalysis/reportAnalysis-index',
        meta: {
          icons: [icons.chart],
          title: '报表分析',
        },
        component: () => import('../views/reportAnalysis/reportAnalysis-index.vue'),
      },
      {
        name: 'reportAnalysis-edit',
        path: '/reportAnalysis/reportAnalysis-edit',
        meta: {
          icons: [icons.chart],
          title: '报表编辑',
        },
        component: () => import('../views/reportAnalysis/reportAnalysis-edit.vue'),
      },
    ],
  },
]
