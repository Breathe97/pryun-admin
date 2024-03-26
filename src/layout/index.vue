<template>
  <el-config-provider :locale="locale">
    <component :is="Layout">
      <ContentView></ContentView>
    </component>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import LayoutAdmin from './layout-admin/index.vue'
import LayoutSuper from './layout-admin-tfxq/index.vue'
import ContentView from './components/ContentView/ContentView.vue'

import { ref, computed } from 'vue'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

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
