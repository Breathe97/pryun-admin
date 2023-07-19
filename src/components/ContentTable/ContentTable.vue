<template>
  <div class="card">
    <div class="card-content">
      <div v-if="title" class="back">
        <el-page-header @back="goBack">
          <template #content>
            <span class="text-large font-600 mr-3"> {{ title || '详情' }} </span>
          </template>
        </el-page-header>
      </div>
      <div class="card-menu">
        <slot name="menu"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElPageHeader } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { StoreSystem } from '@/store/system'
import { nextTick } from 'vue'

const route = useRoute()
const router = useRouter()
const storeSystem = StoreSystem()

const props = defineProps({
  title: {
    type: [String],
    default: '',
  },
})

const goBack = async () => {
  const { fullPath, meta } = route
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:meta`, meta)
  if (meta.hideInSider) {
    storeSystem.removeKeepRoutes(fullPath)
  } else {
    router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.card {
  padding: 32px 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .card-content {
    height: 0;
    flex: 1;
    background-color: var(--color-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.1);
    .back {
      padding: 0 20px;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
