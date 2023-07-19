<template>
  <div class="reportAnalysis">
    <div class="left">
      <leftMenus></leftMenus>
    </div>
    <div class="right">
      <rightContent></rightContent>
    </div>
  </div>
</template>
<script lang="ts" setup>
import leftMenus from './components/left-menus/left-menus.vue'
import rightContent from './components/right-content/right-content.vue'
</script>
<style lang="scss" scoped>
.reportAnalysis {
  position: relative;
  height: calc(100vh - 68px);
  display: flex;
  align-items: center;
  .left {
    position: relative;
    width: 320px;
    height: 100%;
  }
  .left::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.2);
  }
  .right {
    width: 0;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
  }
}
</style>
