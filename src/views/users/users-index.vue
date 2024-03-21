<template>
  <div>
    <ContentTable>
      <template #menu>
        <div class="menus">
          <div class="menus-item">
            <el-button type="primary">新增</el-button>
          </div>
          <div class="menus-item">
            <el-button type="danger">删除</el-button>
          </div>
          <div class="menus-span"></div>
          <div class="menus-item">
            <el-input v-model="inf.key" placeholder="输入关键字" clearable :suffix-icon="Search" />
            <el-button type="primary" @click="getData">搜索</el-button>
          </div>
        </div>
      </template>
      <el-table :data="inf_res.list" style="width: 100%">
        <el-table-column label="头像" width="120" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <el-avatar :size="48" shape="square" :src="scope.row.avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="160">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>昵称: {{ scope.row.nickname }}</div>
                <div>用户名: {{ scope.row.username }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.nickname }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="个人简介">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.comment || '暂无个人简介。' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最后活跃时间" width="240">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.last_active_date ? timeFrom(scope.row.last_active_date) : '近期暂未上线' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-button v-if="scope.row.status === 0" size="small" type="success">正常</el-button>
            <el-button v-else size="small" type="danger">异常</el-button>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="120" prop="sex">
          <template #default="scope">
            <el-button v-if="scope.row.sex === 0" size="small">未知</el-button>
            <el-button v-else-if="scope.row.sex === 1" size="small" type="primary">男</el-button>
            <el-button v-else size="small" type="danger">女</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="160" align="center">
          <template #default="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination small background layout="total, prev, pager, next, jumper, sizes" v-model:current-page="inf.page" v-model:page-size="inf.size" :total="inf_res.total" @current-change="getData" @size-change="getData" />
      </div>
    </ContentTable>
  </div>
</template>
<script lang="ts" setup>
import { ElTable, ElTableColumn, ElPagination, ElButton, ElInput, ElAvatar, ElTag, ElPopover, ElIcon } from 'element-plus'
import { timeFrom } from '@/tools/index'

import * as userApi from '@/api/modules/user'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const inf = ref({
  key: '',
  page: 1,
  size: 10,
})

const inf_res: any = ref({
  total: 0,
  list: [],
})

const getData = () => {
  let _inf = JSON.parse(JSON.stringify(inf.value))
  userApi.usersGet({ params: _inf }).then((res) => {
    const { code = 0, msg, data } = res
    if (code === 200) {
      inf_res.value = data
    }
  })
}
getData()
</script>

<style lang="scss" scoped>
.menus {
  padding: 20px;
  display: flex;
  align-items: center;
  .menus-span {
    flex: 1;
    width: 0;
  }
  .menus-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .menus-item + .menus-item {
    margin-left: 10px;
  }
}
.pagination {
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
