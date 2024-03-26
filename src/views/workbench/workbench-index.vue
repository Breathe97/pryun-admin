<template>
  <div style="padding: 20px; box-sizing: border-box">
    <Card title="销售统计">
      <div class="card-item">
        <svg class="pr-icon" aria-hidden="true" style="font-size: 40px">
          <use :xlink:href="`#pr-icon-pryun`"></use>
        </svg>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Card from './components/card.vue'
import * as workbenchApi from '@/api/modules/workbench'

const icon = ref('calendar')
const aaa = () => {
  icon.value = icon.value === 'calendar' ? 'badge' : 'calendar'
}

const detail = ref({
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
<style scoped>
.aa {
}
</style>
