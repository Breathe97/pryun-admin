<template>
  <div class="echars">
      <div ref="echarsView" class="echars-view" @mouseover="mouseover" @mouseleave.passive="mouseleave"></div>
      <div class="mask" :class="[{ 'mask-show': loading || Empty }]">{{ Empty ? '暂无数据' : '加载中' }}</div>
  </div>
</template>

<script lang="ts" setup>
// import def_option from '@/tools/echart-config.js'
import * as echarts from 'echarts'
import { ref, watch, onBeforeUnmount, nextTick, computed } from 'vue'

const emit = defineEmits(['click', 'mousedown'])

const props = defineProps({
  // 标准的echart 的options数据
  option: {
      type: [Object],
      default: {},
  },
  // 是否自动播放滚动 依赖dataZoom[0],其余的不考虑
  autoPlay: {
      type: [Boolean],
      default: false,
  },
  // 是否监听坐标轴点击事件 返回坐标轴index
  getZr: {
      type: [Boolean],
      default: false,
  },
  // 是否自动切换tooltip
  autoTooltip: {
      type: [Boolean, Number],
      default: false,
  },
  // 图例事件回调
  clickLegend: {
      type: [Function],
      default: undefined,
  },
  // 是否加载中
  loading: {
      type: [Boolean],
      default: false,
  },
})

const mouse_in = ref(false) // 鼠标是否在dom内
// 鼠标移入
const mouseover = () => {
  mouse_in.value = true
}
// 鼠标移出
const mouseleave = () => {
  mouse_in.value = false
}

// 计算图表中数据的长度 其中包含横坐标 纵坐标 也可以直接基于
const ValueLength = computed(() => {
  const { series = undefined } = _option.value
  let length = 0
  if (series) {
      let _firstSeries = series.length ? series[0] : series // 可能不是数组
      const { data = [] } = _firstSeries
      length = data.length
  }
  return length
})

let _option: any = ref({})
const echarsView = ref()
let echarsViewIns: any = null
let timer = 0
let timer_autoTooltip = 0

const autoPlay = () => {
  if (!props.autoPlay) return
  let _firstDataZoom = _option.value.dataZoom.length ? _option.value.dataZoom[0] : _option.value.dataZoom // 可能不是数组
  if (!_firstDataZoom) {
      console.log(`---------->图标自动播放无效,option需要添加.dataZoom[0]:`)
      return
  }
  // 通过定时器的方式刷新，改变statrValue，endValue
  if (timer) {
      clearInterval(timer)
  }
  const { _startValue, _endValue } = _firstDataZoom
  // 清除可能存在的计时器
  clearInterval(timer)
  timer = setInterval(function () {
      if (mouse_in.value) return
      const { dataZoom = undefined } = _option.value
      let _dataZoom = dataZoom.length ? dataZoom[0] : dataZoom // 可能不是数组

      // 每次向后滚动一个，最后一个从头开始。
      if (_dataZoom.endValue === ValueLength.value - 1) {
          _dataZoom.startValue = _startValue
          _dataZoom.endValue = _endValue
      } else {
          _dataZoom.endValue = _dataZoom.endValue + 1
          _dataZoom.startValue = _dataZoom.startValue + 1
      }
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:_dataZoom.endValue`, _dataZoom.endValue, _startValue, _endValue)
      echarsViewIns.setOption(_option.value)
  }, 8000)
}

// 自动切换tooltip
const autoTooltip = async (state = true) => {
  if (props.autoTooltip === false) return
  await nextTick()
  let oldIndex = -1 // 上一次的index
  let currentIndex = 0 // 当前播放的index
  let auto_fun = () => {
      if (mouse_in.value) return
      let length = _option.value.series[0].data.length
      // 取消之前高亮的图形
      if (oldIndex !== -1) {
          echarsViewIns.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: oldIndex })
      }
      // console.log(`---------->日志输出:currentIndex`, currentIndex)
      // 高亮当前图形
      echarsViewIns.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: currentIndex })
      // 滚动图例
      echarsViewIns.dispatchAction({ type: 'legendScroll', scrollDataIndex: currentIndex })
      oldIndex = currentIndex // 保留之前的index
      // 得到下一个高亮的index
      currentIndex = currentIndex + 1
      if (currentIndex >= length) {
          currentIndex = 0
      }
  }
  // 如果传入的 autoTooltip 是数字说明只希望首次触发播放
  if (typeof props.autoTooltip === 'number') return auto_fun() // 需要先执行一次
  // 如果是自动播放
  auto_fun() // 需要先执行一次
  // 清除可能存在的计时器
  clearInterval(timer_autoTooltip)
  //客户不想让图表自动滚动
  timer_autoTooltip = setInterval(auto_fun, 1000000)
  // 下面得鼠标移入移出是具体到图表的 理论上需要控制mouse_in 但是在外层cavans已经控制了 所以这里不需要
  // 鼠标移入
  echarsViewIns.on('mouseover', (e: any) => {
      // 取消之前高亮的图形
      const currentIndex = e.dataIndex
      echarsViewIns.dispatchAction({ type: 'downplay', seriesIndex: 0 })
      echarsViewIns.dispatchAction({ type: 'highlight', dataIndex: currentIndex })
      // 滚动图例
      echarsViewIns.dispatchAction({ type: 'legendScroll', scrollDataIndex: currentIndex })
  })
  // 鼠标移出
  echarsViewIns.on('mouseout', (e: any) => {
      currentIndex = e.dataIndex
  })
}

// 初始化option
const initOption = async () => {
  // 默认的样式
  let { tooltip = {}, dataZoom = undefined, series = undefined } = props.option
  // tooltip = { ...tooltip, ...def_option.tooltipOther } // 修改tooltip为默认的样式
  // 为autoPlay做准备 生成后面要用的
  if (dataZoom) {
      let _firstDataZoom = dataZoom.length ? dataZoom[0] : dataZoom // 可能不是数组
      const { startValue, endValue, _startValue, _endValue } = _firstDataZoom
      // 没有原始值
      if (_startValue === undefined || _endValue === undefined) {
          _firstDataZoom['_startValue'] = startValue
          _firstDataZoom['_endValue'] = endValue
      }
  }
  // 处理series.type===bar 的 barMinHeight
  if (series) {
      let _series = series
      // 不是数组
      if (!_series.length) {
          _series = [_series]
      }
      // 循环处理
      for (const _serie of _series) {
          // 条形图
          if (_serie.type === 'bar' && !_serie.barMinHeight) {
              _serie.barMinHeight = 1
          }
      }
      series = _series
  }
  const option = { ...props.option, tooltip }
  _option.value = option
}

// 初始化图表
const initEchart = async () => {
  await initOption()
  echarsViewIns = echarts.init(echarsView.value, undefined, { renderer: 'canvas' })
  echarsViewIns.setOption(_option.value)
  if (!props['getZr']) {
      // 默认点击事件
      echarsViewIns.on('click', function (e: any) {
          console.log(`---------->echarsViewIns:click`, e)
          emit('click', e)
      })
  } else {
      // 兼容折线图 坐标系点击事件
      echarsViewIns.getZr().on('click', (e: any) => {
          const pointInPixel = [e.offsetX, e.offsetY]
          if (echarsViewIns.containPixel('grid', pointInPixel)) {
              let xIndex = echarsViewIns.convertFromPixel({ seriesIndex: 0 }, [e.offsetX, e.offsetY])[0]
              console.log(`---------->echarsViewIns:mousedown`, xIndex)
              emit('click', xIndex)
          }
      })
      // 将可以响应点击事件的范围内，鼠标样式设为pointer--------------------
      echarsViewIns.getZr().on('mousemove', (params: any) => {
          const { topTarget } = params
          // console.log(`---------->日志输出:topTarget`, topTarget)
          // 给折线的鼠标悬浮 变为 小手
          echarsViewIns.getZr().setCursorStyle('pointer')
      })
  }
  if (props['clickLegend']) {
      echarsViewIns.on('legendselectchanged', (params: any) => {
          // console.log(`---------->日志输出:params`, params)
          echarsViewIns.dispatchAction({ type: 'legendSelect', name: params.name }) // 点击的图例选中
          let func = props['clickLegend']
          func && func(params)
      })
  }
  autoPlay()
  autoTooltip()
  // visible_loading.value = false
}

// 重载图表
const updateEchart = async () => {
  await nextTick()
  await initOption()
  echarsViewIns.setOption(_option.value)
  // 重载_option.value后可能需要重新执行下面的方法
  autoPlay()
  autoTooltip()
}

// 判断图表数据是否为空
const Empty = computed(() => {
  let empty = true
  // 一般是 _option.value.series中得数据是否为空
  const { series = [] } = _option.value
  // console.log(`---------->日志输出:series`, series)
  // 查询有数据的可能性
  for (const serie_item of series) {
      const { data = [] } = serie_item
      if (data.length !== 0) {
          empty = false
          break
      }
  }
  //  loading状态优先
  if (props.loading) {
      empty = false
  }
  // console.log(`---------->日志输出:empty`, empty)
  return empty
})

watch(
  () => props.option,
  (option) => {
      // console.log(`---------->日志输出:option`, option)
      // 没有图表实例的时候需要创建实例
      if (!echarsViewIns) {
          initEchart() // 初始化图表
      } else {
          updateEchart() // 更新图表
      }
  },
  {
      immediate: true,
  }
)
onBeforeUnmount(() => {
  clearInterval(timer)
  clearInterval(timer_autoTooltip)
})
</script>
<style lang="scss" scoped>
.echars {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
.echars-view {
  width: 100%;
  height: 100%;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 230ms ease-out;
  z-index: 9;
  color: rgba(128, 128, 128, 128);
  border-radius: inherit;
  opacity: 0;
  backdrop-filter: none;
  pointer-events: none;
}
.mask-show {
  opacity: 1;
  backdrop-filter: saturate(180%) blur(20px);
  pointer-events: all;
}
</style>
