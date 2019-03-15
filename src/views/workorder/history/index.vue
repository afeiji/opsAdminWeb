<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!--@keyup.enter.native表示回车也调用handleSearch方法-->
        <!--搜索-->
        <el-input v-model="params.title" placeholder="搜索工单标题" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </el-col>
    </el-row>
    <!--子组件表格-->
    <WorkorderList :value="workorders" @delete="handleDelete" @rate="handleRate"/>
    <!--模态窗任务进度-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="任务进度"
      width="50%"
      @close="handleCancelEdit">
      <WorkorderForm />
    </el-dialog>
    <!--分页-->
    <el-row type="flex" justify="center" style="padding-top:20px;">
      <span class="demonstration" />
      <el-pagination
        :total="total"
        layout="prev, pager, next"
        background
        @current-change="handleChange" />
    </el-row>
  </div>
</template>
<script>
import { workordersList, deleteworkorders } from '@/api/workorder/workorder'
import WorkorderList from './table'
import { checkPermission } from '@/utils/auth'
export default {
  name: 'Workorder',
  components: {
    WorkorderList
  },
  data() {
    return {
      total: 0,
      workorders: [],
      params: {
        page: 1,
        name: '',
        status: 2
      },
      currentValue: {},
      dialogVisibleForEdit: false,
      dialogVisibleForAdd: false
    }
  },
  computed: {
    addBookPerm: function() {
      return checkPermission('books.add_book')
    }
  },
  created() {
    this.fetchworkorderlist()
  },
  methods: {
    fetchworkorderlist() {
      workordersList(this.params).then(res => {
        this.workorders = res.results
        this.total = res.count
      })
    },
    handleDelete(value) {
      const { id, ...params } = value
      deleteworkorders(id).then(res => {
        this.$message({
          message: `工单 ${params.title} 取消成功`,
          type: 'success'
        })
        this.fetchworkorderlist()
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchworkorderlist()
    },
    handleCancelEdit() {
    },
    handleRate(value) {
      this.dialogVisibleForEdit = true
    },
    handleSearch() {
      this.params.page = 1
      this.fetchworkorderlist()
    }
  }
}
</script>
