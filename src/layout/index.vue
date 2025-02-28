<template>
  <component :is="Layout">
    <ContentView></ContentView>
  </component>
</template>

<script lang="ts" setup>
import LayoutAdmin from './layout-admin/index.vue'
import LayoutSuper from './layout-admin-tfxq/index.vue'
import ContentView from './components/ContentView/ContentView.vue'

import { computed } from 'vue'

const role = 'super' // 可能需要根据角色来动态显示不同的布局

const layoutList = {
  admin: LayoutAdmin,
  super: LayoutSuper,
}

const Layout = computed(() => {
  let _layout = layoutList[role]
  if (!_layout) {
    console.error(`------->Breathe:当前角色布局组件不存在`, { role })
  }
  return _layout
})
</script>
<style scoped></style>
