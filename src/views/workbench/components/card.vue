<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <div class="content-infos">
        <div class="info-item" v-for="(item, index) in infos" :key="index">
          <div class="title">{{ item.name }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </div>
      <div class="content-echart"><slot name="echart"></slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type Info = {
  name: string
  value: string | number
}

const props = defineProps({
  title: {
    type: [String],
    default: () => '',
  },
  infos: {
    type: [Array<Expand<Info>>],
    default: () => [],
  },
})
</script>
<style scoped lang="scss">
.card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  .card-title {
    padding: 0 16px;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #0097ff;
    color: #ffffff;
  }
  .card-content {
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    min-height: 80px;
    background-color: #ffffff;
    display: flex;

    .content-infos {
      margin-right: 20px;
      padding: 20px;
      background-color: rgba(0, 151, 255, 0.1);
      border-radius: 6px;
      box-sizing: border-box;
      height: fit-content;
      .info-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        min-height: 32px;
        .name {
          flex: 1;
          min-width: fit-content;
        }
        .value {
          width: 40px;
          text-align: right;
        }
      }
      .info-item + .info-item {
        margin-top: 20px;
      }
    }
    .content-echart {
      background-color: rgb(99, 49, 49);
      width: 100%;
      height: calc(100% - 40px);
      flex: 1;
      border-radius: 6px;
    }
  }
}
</style>
