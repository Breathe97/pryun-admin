<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: [String],
    default: () => '',
  },
})
</script>
<style scoped lang="scss">
.card {
  border-radius: 12px;
  overflow: hidden;
  .card-title {
    padding: 0 16px;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: rgba(64, 158, 254, 1);

    color: #ffffff;
  }
  .card-content {
    min-height: 80px;
    background-color: #ffffff;
  }
}
</style>
