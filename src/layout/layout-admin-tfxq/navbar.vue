<template>
  <div class="g-blur navbar">
    <div class="navbar-content">
      <div class="logo">
        <div class="logo-img"></div>
        <div class="logo-text">天府新区可视化报表系统</div>
      </div>
      <div class="content-flex-1">
        <div class="menus">
          <div class="menus-item" v-for="(item, index) in dynamicRoutes" :key="index" :class="[{ 'menus-item-active': MenusItemActive(item.path) }]" @click="select(item)">{{ item.meta?.title }}</div>
        </div>
      </div>
      <div class="menu-btn">
        <div class="menu-icon icon-search invert"></div>
      </div>
      <div class="menu-btn" @click="changeFullscreen(!isFullscreen)">
        <div class="menu-icon icon-screen-full invert"></div>
      </div>
      <el-dropdown trigger="click">
        <div class="menu-btn">
          <div class="menu-icon icon-user">
            <img class="menu-icon-img" v-if="userInfo.avatar || userInfo.headUrl || userInfo.head" :src="userInfo.avatar || userInfo.headUrl || userInfo.head" alt="" />
          </div>
          <div class="menu-text">{{ userInfo.nickname || userInfo.realname || '游客' }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openAccount"
              ><el-icon><User /></el-icon>个人资料</el-dropdown-item
            >
            <el-dropdown-item @click="openChangePwd"
              ><el-icon><Lock /></el-icon>修改密码</el-dropdown-item
            >
            <el-dropdown-item @click="logout"
              ><el-icon><SwitchButton /></el-icon>注销登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { StoreUser } from '@/store/user'
import { StoreSystem } from '@/store/system'
import { computed, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()
const storeSystem = StoreSystem()
const storeUser = StoreUser()

const userInfo: any = computed(() => storeUser.userInfo)

const dynamicRoutes = computed(() => {
  const fullRoutes = storeSystem.dynamicRoutes
  return fullRoutes.filter((item) => {
    if (item.meta) {
      return !item.meta.hideInNav
    } else {
      return true
    }
  })
  // return storeSystem.dynamicRoutes
}) // 动态路由列表

// 选中切换
const select = (route: RouteRecordRaw) => {
  router.push(route.path)
}

// 是否已激活
const MenusItemActive = computed(() => {
  return function (_path: string) {
    const { path } = route
    let active = path.indexOf(_path) === 0
    return active
  }
})

const logout = async () => {
  await storeUser.logout()
  router.push('/login')
}

const openAccount = () => {
  router.push('/account')
}
const openChangePwd = () => {
  router.push('/account/account-pwd')
}

const isFullscreen = ref(false)
// 全屏
const changeFullscreen = (state: boolean) => {
  if (state) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  isFullscreen.value = state
}
</script>
<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  background-color: rgba(35, 36, 38, 1);
  flex-shrink: 0;
  color: #ffffff;
  height: 68px;
  box-sizing: border-box;
}
.menus {
  height: 100%;
  display: flex;
  align-items: center;
}
.menus-item {
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 230ms ease-out;
}
.menus-item:hover {
  /* background-color: rgba(17, 18, 22, 1); */
  color: rgba(65, 125, 255, 1);
}
.menus-item-active {
  background-color: rgba(17, 18, 22, 1);
  color: rgba(65, 125, 255, 1);
}
.navbar-content {
  height: 68px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
}
.navbar-keepRoutes {
  height: 50px;
}
.logo {
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  height: 68px;
  display: flex;
  align-items: stretch;
  transition: inherit;
}
.logo-img {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  transform: scale(1.2);
  z-index: 1;
  background-image: url('@/assets/logo.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.logo-text {
  flex-shrink: 0;
  position: relative;
  margin-left: 16px;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  align-items: center;
  flex-wrap: nowrap;
  transition: inherit;
  left: 0;
  opacity: 1;
}

.keepRoutes-list {
  position: relative;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.keepRoutes-list-item {
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 6px;
  padding: 0 8px;
  height: 32px;
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  transition: all 230ms ease-out;
}
.keepRoutes-list-item:hover,
.keepRoutes-list-item-active {
  background-color: #dad8d8;
}

.keepRoutes-list-item-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
.keepRoutes-list-item-icon-img {
  width: 100%;
  height: 100%;
}
.keepRoutes-list-item-text {
  white-space: nowrap;
}
.keepRoutes-list-item-close {
  position: relative;
  margin-left: 4px;
  padding: 4px;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
  transition: all 230ms ease-out;
}
.keepRoutes-list-item-close::after {
  content: '';
  width: 100%;
  height: 100%;
  background-image: url('./static/cross.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.keepRoutes-list-item-close:hover {
  background-color: rgba(128, 128, 128, 0.5);
}

.content-flex-1 {
  width: 0;
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.menu-btn {
  padding: 8px 16px;
  min-width: 40px;
  min-height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 230ms ease-out;
  cursor: pointer;
}
.menu-btn:hover {
  background-color: rgba(17, 18, 22, 1);
}
.menu-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.menu-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.invert {
  filter: invert(100%);
}
.menu-icon + .menu-text {
  margin-left: 8px;
}
.icon-list {
  background-image: url('./static/list-arrow-right.png');
  transform: rotateZ(180deg);
}
.icon-list-active {
  transform: rotateZ(0deg);
}
.icon-search {
  background-image: url('./static/search.png');
}
.icon-screen-full {
  background-image: url('./static/screen-full.png');
}
.icon-refresh {
  background-image: url('./static/refresh.png');
}

.icon-user {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-image: url('data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/wAALCACEAIQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMFAgQGAQj/xAAuEAEAAgECAggGAgMAAAAAAAAAAQIDBBEFIRIVMUFRZKLhEyJhcYHBFFIjkdH/2gAIAQEAAD8A+gQAAACIAIgAAAAAiACIAAAAAAAAAAAAQ6vVU0mH4l+c90eMqDPrtRqLb2vaI8I5QhrkvjtvS9on6WWnD+KWm8YtRbfflF/+rcAAABz/ABbPOXXTXux/JH7aIOl4dnnPoqWtzmOU/lsgAAA5jWxMa7NE/wB5QAvuDRMaKZ8bz+lgAAACk4zpZrmjUV7L8p+ysGVa2yXila7zPKHTaXDGn01MX9Y5/dMAAADHLirmxTjvXekuXzY/g5r4+3ozMf7Rrjgunr0Z1E8532p9FsAAAA09ZxLFp6zWtunk8I7vu5+1pyXm9uczO8sW/wAO4h/EmaXrvjnn9pXmLLjzU6eO1bx9WYAACHUavFpadLJbn3R3ypdXxTNqN60/x08I7Z/DRASYc+TBfp4rWpK40nGKZdq5/knx7vdY9vOHoAA5TLlvmyTkvbeYYAALrguW9seTHa29a7bfndaAACptwKs3ma59o8Ojv+3nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7t3Q6KuipeIv05t2z2djaAAAAAAAAAAAAAAAAAAAAAAAB/9k=');
  filter: none;
}
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.breadcrumb-item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #000000;
}
.breadcrumb-item-span {
  padding: 0 8px;
  line-height: 1;
}
.breadcrumb-item-text {
  white-space: nowrap;
}

.breadcrumb-item-text-hover {
  opacity: 1;
  transition: all 230ms ease-out;
  cursor: pointer;
}

/* 对移动中的元素应用的过渡 */
.breadcrumbTransition-move,
.breadcrumbTransition-enter-active,
.breadcrumbTransition-leave-active {
  transition: all 500ms ease-out;
}

.breadcrumbTransition-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.breadcrumbTransition-leave-to {
  opacity: 0;
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.breadcrumbTransition-leave-active {
  position: absolute;
}

/* 1. 声明过渡效果 */
.keepRoutesTansition-move,
.keepRoutesTansition-enter-active,
.keepRoutesTansition-leave-active {
  transition: all 500ms cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.keepRoutesTansition-enter-from,
.keepRoutesTansition-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translateX(30px);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.keepRoutesTansition-leave-active {
  position: absolute;
}
</style>
