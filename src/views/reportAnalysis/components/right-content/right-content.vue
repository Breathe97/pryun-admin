<template>
  <div class="right-content">
    <div class="menus">
      <div class="title">{{ info.title }}</div>
      <div class="user">创建者：{{ info.user }}</div>
      <div class="more-info">
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
        <el-button plain>编辑</el-button>
        <el-button plain>全屏预览</el-button>
        <el-button plain>分享</el-button>
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

const info = ref({
  title: '【官方示例】阿勒泰地区旅游数据',
  user: 'Breathe',
})
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
    .title {
      font-size: 16px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .user {
      position: relative;
      margin-left: 20px;
      opacity: 0.7;
      line-height: 1;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }

    .user::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 80%;
      width: 2px;
      background-color: rgba(128, 128, 128, 0.2);
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
