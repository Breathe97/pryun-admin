<template>
  <div class="left-menus min-scrollbar">
    <div style="min-height: 16px; flex-shrink: 0"></div>
    <div class="search">
      <el-input v-model="inf.key" placeholder="输入报表名称" clearable :suffix-icon="Search" />
    </div>
    <div class="title backdrop-filter">
      <div class="title-text">默认报表</div>
      <div style="flex: 1; width: 0"></div>
    </div>
    <div class="list">
      <div class="list-item" :class="[{ 'list-item-active': activeIndex === item.id }]" v-for="(item, index) in def_list" @click="select(item)">
        <div class="list-item-name">{{ item.name }}</div>
        <div class="icon-btn filter-hover">
          <el-dropdown trigger="click">
            <el-icon :size="16"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="EditPen">编辑</el-dropdown-item>
                <el-dropdown-item :icon="CopyDocument">复制</el-dropdown-item>
                <el-dropdown-item :icon="Share">分享</el-dropdown-item>
                <el-dropdown-item :icon="Edit">重命名</el-dropdown-item>
                <el-dropdown-item :icon="Delete"> 删除 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div style="min-height: 16px; flex-shrink: 0"></div>
    <div class="title backdrop-filter">
      <div class="title-text">我的报表</div>
      <div style="flex: 1; width: 0"></div>
      <div class="icon-btn filter-hover">
        <el-tooltip content="创建一个新的报表" placement="top" effect="light">
          <el-icon :size="20"><Plus /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="list">
      <div class="list-item" :class="[{ 'list-item-active': activeIndex === item.id }]" v-for="(item, index) in list" @click="select(item)">
        <div class="list-item-name">{{ item.name }}</div>
        <div class="icon-btn filter-hover">
          <el-dropdown trigger="click">
            <el-icon :size="16"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="EditPen">编辑</el-dropdown-item>
                <el-dropdown-item :icon="CopyDocument">复制</el-dropdown-item>
                <el-dropdown-item :icon="Share">分享</el-dropdown-item>
                <el-dropdown-item :icon="Edit">重命名</el-dropdown-item>
                <el-dropdown-item :icon="Delete"> 删除 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div style="min-height: 16px; flex-shrink: 0"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Search, Edit, EditPen, Delete, CopyDocument, Share, Plus } from '@element-plus/icons-vue'

const inf = ref({
  key: '',
})

const def_list = ref([
  { id: 1, name: '【官方示例】阿勒泰地区旅游数据' },
  { id: 2, name: '【官方示例】2021年全国GDP数据' },
  { id: 3, name: '【官方示例】某节目相关数据分析' },
  { id: 4, name: '【官方示例】某节目相关数据分析' },
  { id: 5, name: '【官方示例】某节目相关数据分析' },
  { id: 6, name: '【官方示例】某节目相关数据分析' },
])

const list = ref([
  { id: 11, name: '电商公司年度销售大屏' },
  { id: 12, name: '短视频用户数据分析报告' },
  { id: 13, name: '航空公司运行监测看板' },
  { id: 14, name: '人力资源管理综合分析' },
  { id: 15, name: '云服务平台数据大屏' },
  { id: 16, name: '无线网管理中心' },
  { id: 17, name: '某运动品牌销售看板' },
  { id: 18, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 19, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 20, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 21, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 22, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 23, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 24, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 25, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 26, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 27, name: '某运动品牌销售看板某运动品牌销售看板' },
  { id: 28, name: '某运动品牌销售看板某运动品牌销售看板' },
])

const activeIndex = ref(1)

const select = (item: any) => {
  activeIndex.value = item.id
}
</script>
<style lang="scss" scoped>
.left-menus {
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  overflow-y: overlay;
  display: flex;
  flex-direction: column;
  .title {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9;
    box-sizing: border-box;
    font-size: 18px;
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    background-color: var(--color-bg);
  }
  .search {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .list {
    width: 100%;
    .list-item {
      padding: 0 16px;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      cursor: pointer;
      transition: all 230ms ease-out;

      .list-item-name {
        width: 0;
        flex: 1;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      &:hover {
        background-color: rgba(128, 128, 128, 0.3);
      }
    }
    .list-item + .list-item {
      margin-top: 10px;
    }

    .list-item-active {
      background-color: #0097ff;
      &:hover {
        background-color: #0097ff;
      }
    }
  }
  .icon-btn {
    margin-left: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
