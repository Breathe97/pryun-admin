<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="modelValue ? 'success' : ''">
      <div class="block" :style="[Style]" @mousedown="rangeMove">
        <el-icon class="block-run" v-if="!modelValue"><Cherry /></el-icon>
        <el-icon v-else="modelValue" @click="reset"><Select /></el-icon>
      </div>
      {{ modelValue ? successText : startText }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { ref, computed, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [Boolean],
    required: true,
    default: false,
  },
  //成功文字
  successText: {
    type: String,
    default: '验证成功',
  },
  //开始的文字
  startText: {
    type: String,
    default: '请拖住滑块，拖动到最右边',
  },
})

const disX = ref(0)
const offsetX = ref(0)
const rangeMove = (e: any) => {
  if (props.modelValue) return false
  let ele = e.target
  let startX = e.clientX
  let eleWidth = ele.offsetWidth
  let parentWidth = ele.parentElement.offsetWidth
  let MaxX = parentWidth - eleWidth

  document.onmousemove = (e) => {
    let endX = e.clientX
    disX.value = endX - startX
    let _offsetX = Math.max(disX.value, 0) // 最小值不能小于0
    _offsetX = Math.min(disX.value, MaxX) // 不能超过父级宽度
    offsetX.value = _offsetX
    e.preventDefault()
  }
  document.onmouseup = () => {
    // 距离不够
    if (disX.value < MaxX) {
      offsetX.value = 0
      emit('update:modelValue', false)
    } else {
      emit('update:modelValue', true)
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}

const Style = computed(() => {
  let _offsetX = offsetX.value
  const _style = {
    transform: `translateX(${_offsetX}px)`,
  }
  return _style
})

// 重置
const reset = () => {
  offsetX.value = 0
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (a) => {
    if (!a) {
      reset()
    }
  }
)
</script>
<style lang="scss" scoped>
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jc-component__range {
  .jc-range {
    padding-left: 40px;
    background-color: #e9e9e9;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    transition: 1s all;
    user-select: none;
    color: #585858;
    @include jc-flex;
    height: 40px; /*no*/
    &.success {
      background-color: #009726;
      color: #fff;
      .block {
        color: #009726;
      }
    }
    .block {
      position: absolute;
      left: 0;
      width: 40px; /*no*/
      height: 100%;
      color: rgba(65, 125, 255, 1);
      background-color: #fff;
      box-shadow: 0 0 10px 10px rgba(128, 128, 128, 0.1) inset;
      cursor: pointer;
      font-size: 24px;
      @include jc-flex;
      will-change: filter;
      transition: filter 300ms;
      filter: drop-shadow(0 0 2em rgba(65, 125, 255, 1));
      .block-run {
        pointer-events: none;
      }
    }
  }
}
</style>
