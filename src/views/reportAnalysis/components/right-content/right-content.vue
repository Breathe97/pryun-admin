<template>
  <div class="right-content">
    <div class="menus">
      <template v-if="mode === 'edit'">
        <div class="back filter-hover" @click="back">
          <div class="back-icon">
            <el-icon :size="16"><Back /></el-icon>
          </div>
          <div class="back-text">返回</div>
        </div>
        <div class="span"></div>
      </template>
      <div class="title">{{ info.title }}</div>
      <div class="span"></div>
      <div class="user">创建者：{{ info.user }}</div>
      <div class="more-info filter-hover">
        <el-popover placement="bottom" title="详情" :width="260" trigger="click">
          <template #reference>
            <el-icon><InfoFilled /></el-icon>
          </template>
          <div class="more-info-rows" style="line-height: 28px">
            <div class="rows-item">创建人：Breathe</div>
            <div class="rows-item">创建时间：2023-07-18 11:39</div>
            <div class="rows-item">最近修改人：BT-7274</div>
            <div class="rows-item">最近修改时间：2023-07-19 18:25</div>
          </div>
        </el-popover>
      </div>
      <div style="width: 0; flex: 1; min-width: 10px"></div>
      <div class="btns">
        <template v-if="mode === 'view'">
          <el-button plain>刷新</el-button>
          <el-button plain @click="edit">编辑</el-button>
          <el-button plain>全屏预览</el-button>
          <el-button plain>分享</el-button>
        </template>
        <template v-else-if="mode === 'edit'">
          <el-button plain @click="save">保存</el-button>
        </template>
      </div>
    </div>
    <div class="preview-content">
      <PrScreenAdapter :width="1920 * 1" :height="1080 * 1" mode="aspectFit" bg="rgba(0,0,0,0)">
        <div class="preview-content-view">
          <div class="preview-content-view-img"></div>
        </div>
      </PrScreenAdapter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PrScreenAdapter } from 'pr-screen-adapter'
// import PrScreenAdapter from '@/components/PrScreenAdapter/PrScreenAdapter.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const props = defineProps({
  // 显示模式 view:查看 edit:编辑
  mode: {
    type: [String],
    default: 'view',
  },
})

const router = useRouter()
const info = ref({
  title: '【官方示例】阿勒泰地区旅游数据',
  user: 'Breathe',
})

const edit = () => {
  router.push('/reportAnalysis/reportAnalysis-edit?id=222')
}

const back = () => {
  router.go(-1)
}

const save = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.right-content {
  padding: 16px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .menus {
    box-sizing: border-box;
    flex-shrink: 0;
    height: 40px;
    display: flex;
    line-height: 1;
    align-items: center;
    .span {
      margin: 0 12px;
      height: 12px;
      width: 1px;
      background-color: rgba(128, 128, 128, 0.5);
    }
    .back {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      line-height: 1;
      cursor: pointer;
      .back-icon {
        display: flex;
        align-items: center;
      }
      .back-text {
        margin-left: 8px;
      }
    }

    .title {
      font-size: 16px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .user {
      position: relative;
      opacity: 0.7;
      line-height: 1;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }

    .more-info {
      position: relative;
      margin-left: 4px;
      opacity: 0.7;
      line-height: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .btns {
      flex-shrink: 0;
    }
  }

  .preview-content {
    margin-top: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 0;
    flex: 1;
    overflow: hidden;

    .preview-content-view {
      width: 100%;
      height: 100%;
      display: flex;
      // flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .preview-content-view-img {
      width: 1920px;
      height: 1080px;
      background-image: url('../../static/example_1.jpg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
