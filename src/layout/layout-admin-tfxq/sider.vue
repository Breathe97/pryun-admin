<template>
  <div class="sider" :class="[{ 'sider-min': siderRetract }]">
    <div class="sider-content">
      <div class="sider-view">
        <div class="menus">
          <div v-for="(item, index) in dynamicRoutes" :key="index">
            <div class="menus-item" :class="[{ 'menus-item-expand': Expand(item) }]" :style="[Style_menus_item(item)]">
              <!-- 单行 -->
              <div class="menus-item-row" :class="[{ 'menus-item-row-active': MenusItemActive(TopRoute(item).path) }]" @click="select(TopRoute(item))">
                <div class="row-icon">
                  <img class="row-icon-img" :src="TopRoute(item).meta?.icons?.[0]" alt="" />
                </div>
                <div class="row-title">{{ TopRoute(item).meta?.['title'] }}</div>
                <div v-if="HasChildren(TopRoute(item))" class="row-arrow"></div>
              </div>
              <!-- 多行 -->
              <div v-if="HasChildren(item)" class="menus-item-rows">
                <div v-for="(item2, index2) in item.children" :key="index2">
                  <div class="menus-item" :style="[Style_menus_item(item2)]">
                    <!-- 单行 -->
                    <div class="menus-item-row" :class="[{ 'menus-item-row-active': MenusItemActive(item2.path) }]" @click="select(item2)">
                      <div class="row-icon">
                        <img class="row-icon-img" :src="item2.meta?.icons?.[0]" alt="" />
                      </div>
                      <div class="row-title">{{ item2.meta?.['title'] }}</div>
                      <div v-if="HasChildren(item2)" class="row-icon row-arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { ref, computed } from 'vue'
import { StoreSystem } from '@/store/system'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()
const storeSystem = StoreSystem()

const dynamicRoutes = computed(() => storeSystem.dynamicRoutes) // 动态路由列表
const siderRetract = computed(() => storeSystem.siderRetract)
const siderExpands = computed(() => storeSystem.siderExpands)

// 选择菜单
const select = (route: RouteRecordRaw) => {
  const { path, children = [] } = route
  // 如果没有下一级 表示跳转路由
  if (children.length <= 1 || siderRetract.value) {
    return router.push(path)
  }
  storeSystem.changeSiderExpands(path)
}

// 计算顶级菜单
const TopRoute = computed(() => {
  return function (route: RouteRecordRaw) {
    const { children = [] } = route
    const _children = children.filter((item) => !item.meta?.hideInSider) // 过滤掉隐藏路由
    if (_children.length === 1) return _children[0]
    return route
  }
})

// 计算展开的高度
const Style_menus_item = computed(() => {
  return function (route: RouteRecordRaw) {
    const { children = [] } = route
    const _children = children.filter((item) => !item.meta?.hideInSider) // 过滤掉隐藏路由
    let style = {
      '--height': `${_children.length * 50}px`,
    }
    return style
  }
})

// 是否可以展开
const HasChildren = computed(() => {
  return function (route: RouteRecordRaw) {
    const { children = [] } = route
    const _children = children.filter((item) => !item.meta?.hideInSider) // 过滤掉隐藏路由
    return _children.length > 1
  }
})

// 是否已激活展开
const Expand = computed(() => {
  return function (route: RouteRecordRaw) {
    const { path } = route
    return siderExpands.value.includes(path) && !siderRetract.value
  }
})

// 是否已激活
const MenusItemActive = computed(() => {
  return function (_path: string) {
    const { path, meta } = route
    let active = path === _path
    if (meta && meta.hideInSider) {
      active = meta.hideInSider === _path
    }
    return active
  }
})
</script>
<style scoped>
.sider {
  width: 280px;
  height: 100vh;
  transition: inherit;
}
.sider-content {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background-color: var(--color-sider);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: inherit;
}
@supports (-webkit-touch-callout: none) {
  .sider-content {
    min-height: -webkit-fill-available;
  }
}

.logo {
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  height: 78px;
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
  width: calc(280px - 40px - 8px - 32px);
  position: relative;
  margin-left: 16px;
  display: flex;
  font-size: 18px;
  align-items: center;
  flex-wrap: nowrap;
  transition: inherit;
  left: 0;
  opacity: 1;
}
.sider-view {
  height: 0;
  flex: 1;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: overlay;
  transition: inherit;
}
.sider-min {
  width: 72px;
}
.sider-min .logo-text {
  opacity: 0;
  left: -36px;
}

.menus {
  transition: inherit;
  user-select: none;
}
.sider-min .row-title,
.sider-min .row-arrow {
  transition: all ease-out 230ms;
  opacity: 0;
  left: -36px;
}

.menus-item {
  position: relative;
  transition: inherit;
}

.menus-item-row {
  position: relative;
  padding: 0 16px;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 230ms ease-out;
  background-color: var(--color-sider);
  z-index: 2;
}
.menus-item-row-active {
  color: #0097ff;
}
.menus-item-row:hover {
  background-color: var(--color-pr-action-sheet-active);
}
.menus-item-rows {
  position: relative;
  max-height: 0px;
  z-index: 1;
  transition: max-height ease-out 230ms;
  overflow: hidden;
}
.menus-item-expand .menus-item-rows {
  max-height: var(--height);
}

.menus-item-rows .menus-item-row {
  height: 50px;
  padding-left: 32px;
}

.menus-item + .menus-item {
  margin-top: 10px;
}

.row-icon {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 28px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row-icon-img {
  height: 24px;
  width: auto;
  object-fit: cover;
}
.row-title {
  position: relative;
  width: 0;
  flex: 1;
  left: 0;
  margin-left: 8px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  transition: inherit;
}
.row-arrow {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 28px;
  flex-shrink: 0;
  transition: all ease-out 230ms;
  background-size: 18px 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./static/arrow-bottom.png');
}
.menus-item-expand .row-arrow {
  transform: rotateZ(180deg);
}
</style>
