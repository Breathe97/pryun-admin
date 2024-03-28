<template>
  <div style="padding: 20px; box-sizing: border-box">
    <div class="box">
      <div class="box-row">
        <div class="box-row-item" style="flex: 2">
          <Card title="销售额" :infos="detail.infos_a"> </Card>
        </div>
        <div class="box-row-item" style="flex: 2">
          <Card title="已销售" :infos="detail.infos_b"> </Card>
        </div>
        <div class="box-row-item" style="flex: 3">
          <Card title="退换货" :infos="detail.infos_c"> </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Card from './components/card.vue'
import * as workbenchApi from '@/api/modules/workbench'

const detail = ref({
  infos_a: [
    { name: '今日销售量', value: 0 },
    { name: '本月销售量', value: 0 },
  ],
  infos_b: [
    { name: '待提交商品', value: 0 },
    { name: '待发货商品', value: 0 },
  ],
  infos_c: [
    { name: '退款审核', value: 0 },
    { name: '退货审核', value: 0 },
    { name: '退货验收', value: 0 },
  ],
  monthCount: 0,
  todayCount: 0,
  submitSpu: 0,
  expressCount: 0,
  checkReturn: 0,
  auditReturn: 0,
  auditRefund: 0,
})

const getData = () => {
  workbenchApi.getGoodsSale().then((res) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
  })
  workbenchApi.getGoodsStat().then((res) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
  })
  workbenchApi.getGoodsStatChart().then((res) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
  })
}
getData()
</script>
<style scoped lang="scss">
.box {
  .box-row {
    display: flex;
    align-items: center;
    gap: 20px;
    align-items: stretch;
    flex-wrap: wrap;

    .box-row-item {
      width: 0;
      min-width: 300px;

      flex: 1;
    }
  }
}
.content {
  padding: 20px;
  gap: 20px;
  display: flex;
  .card-item {
    flex: 1;
    width: 0;
    background-color: rgba(0, 151, 255, 0.1);
    border-radius: 6px;
    padding: 10px 20px;
    text-align: center;
    transition: all ease-out 230ms;
    &:hover {
      background-color: rgba(0, 151, 255, 0.2);
    }
    .title {
      font-size: 16px;
      padding: 6px 0;
    }
    .value {
      font-size: 24px;
    }
  }
}
</style>
