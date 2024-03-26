import { defineStore } from 'pinia'
import Layout from '@/layout/index.vue'
import router from '@/router/index'
import { dynamicRoutes } from '@/router/dynamicRoutes'
import { RouteRecordRaw } from 'vue-router'
import { StoreUser } from '@/store/user'

// 系统相关的
export const StoreSystem = defineStore('StoreSystem', {
  // 持久化列表
  persist: [
    {
      paths: ['dynamicRoutes', 'siderRetract', 'siderExpands', 'sidebarActivePath', 'breadcrumb', 'keepRoutes'],
      storage: localStorage,
    },
  ],
  state: () => {
    return {
      first: true, // 首次进入需要重新初始化路由
      refreshKey: 0, // 刷新页面
      dynamicRoutes: [] as RouteRecordRaw[], // 用户可访问的动态路由
      siderMenus: [] as RouteRecordRaw[], // 侧边栏路由 (当采用分离式菜单时用到)

      siderRetract: false, // 是否收回侧边栏
      siderExpands: [] as string[], // 侧边栏展开项
      breadcrumb: [] as RouteRecordRaw[], // 面包屑
      keepRoutes: [] as RouteRecordRaw[], // 缓存路由
    }
  },
  actions: {
    refresh() {
      this.refreshKey = new Date().getTime()
    },
    // 设置侧边栏展开
    setSiderRetract(state: boolean) {
      this.siderRetract = state
    },
    // 侧边栏菜单展开
    changeSiderExpands(path: string) {
      const index = this.siderExpands.findIndex((_path) => _path === path)
      if (index === -1) {
        this.siderExpands.push(path)
      } else {
        this.siderExpands.splice(index, 1)
      }
    },
    // 更新面包屑
    updateBreadcrumb(arr: RouteRecordRaw[]) {
      this.breadcrumb = arr
    },
    // 更新缓存路由
    addKeepRoutes(route: RouteRecordRaw) {
      const { path } = route
      const index = this.keepRoutes.findIndex((item) => item.path === path)
      // 不存在 添加
      if (index === -1) {
        this.keepRoutes.push(route)
      }
    },
    // 移除缓存路由
    removeKeepRoutes(path: string) {
      const index = this.keepRoutes.findIndex((item) => item.path === path)
      // 存在
      if (index !== -1 && this.keepRoutes.length > 1) {
        this.keepRoutes.splice(index, 1)
        // 如果存在 说明即将删除删除的是当前页面
        const currentRoute = router.currentRoute.value // 当前路由
        if (currentRoute.fullPath === path) {
          // 如果有上级路由
          if (currentRoute.meta.hideInSider) {
            router.push(currentRoute.meta.hideInSider)
          } else {
            // 删除后的页面地址
            const newIndex = Math.max(0, index - 1)
            const endRoute = this.keepRoutes[newIndex]
            router.push(endRoute.path)
          }
        }
      }
    },
    // 初始化系统数据
    init(force = true) {
      return new Promise(async (resolve, reject) => {
        // 刷新后需要重新加载路由
        let _first = this.first
        if (_first || force) {
          this.first = false
          try {
            // 尝试获取用户信息
            const storeUser = StoreUser()
            await storeUser.usersGetInfo()
            // 尝试获取用户路由
            await this.dynamicRoutesInit()
          } catch (error) {
            // 处理必须数据出错向外抛出 不能正常进入系统
            reject(error)
          }
        }
        resolve(_first)
      })
    },
    // 路由改变后对应的一些变化
    change() {
      const currentRoute = router.currentRoute.value // 当前路由
      const { path, fullPath, meta, matched } = currentRoute
      if (path === '/') return
      window.scrollTo({ top: 0 }) // 需要把滚动条滑到最上方 不然过渡动画有问题 参考element-admin
      // 属于侧边栏菜单路由 更新面包屑
      if (!meta.hideInSider) {
        const arr = matched.map((item) => {
          const { name, path, meta, children } = item
          return { name, path, meta, children }
        })
        this.updateBreadcrumb(arr)
      }
      // 路由变化后更新缓存路由列表
      if (meta.keepAlive !== false) {
        const { name, meta, children } = matched[matched.length - 1]
        let obj = { name, path: fullPath, meta, children }
        this.addKeepRoutes(obj)
      }
    },
    // 初始化动态路由
    async dynamicRoutesInit(routesPath = []) {
      // 过滤合法路由
      const dynamicRoutesFilter = (routes: any) => {
        return dynamicRoutes
        // return new Promise((resolve, reject) => {
        //   // 检测当前路由是否被服务端认可 返回合法路由 不合法返回null
        //   const dynamicRouteFilter = (dynamicRoute: any, routes: DynamicRoute[]) => {
        //     // console.log(`---------->日志输出:routes`, routes)
        //     // 将服务端routes 与本地 dynamicRoutes 进行对比 取合集
        //     let _dynamicRoute = null // 默认不合法

        //     // 遍历服务端路由
        //     let routesMap = (_routes: DynamicRoute[]) => {
        //       for (const _route of _routes) {
        //         if (_route.path === dynamicRoute.path) {
        //           _dynamicRoute = dynamicRoute
        //           break
        //         }
        //         if (_route.children && _route.children.length !== 0) {
        //           routesMap(_route.children)
        //         }
        //       }
        //     }
        //     routesMap(routes)
        //     return _dynamicRoute
        //   }
        //   // 申明最终的合法路由
        //   let _dynamicRoutes: DynamicRoute[] = []
        //   // 遍历检测所有路由路由是否合法 如果合法才添加到新数组
        //   for (const dynamicRoute of dynamicRoutes) {
        //     let _dynamicRoute = dynamicRouteFilter(dynamicRoute, routes)
        //     if (_dynamicRoute) {
        //       _dynamicRoutes.push(_dynamicRoute)
        //     }
        //   }
        //   // console.log(`---------->日志输出:_dynamicRoutes`, _dynamicRoutes)
        //   resolve(_dynamicRoutes)
        // })
      }
      // 获取合法路由
      let _dynamicRoutes: any = await dynamicRoutesFilter(routesPath)
      // 遍历 注册合法路由
      for (const dynamicRoute of _dynamicRoutes) {
        // 加载layout组件
        dynamicRoute.component = () => new Promise((resolve) => resolve(Layout))
        // 注册路由
        router.addRoute(dynamicRoute)
      }
      router.replace(router.currentRoute.value.fullPath)
      // 将路由存入store
      this.dynamicRoutes = _dynamicRoutes
    },
  },
})
