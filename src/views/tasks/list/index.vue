<template>
  <div>
    <!--子组件表格-->
    <TasksList :value="autoasks" @edit="handleEdit" @detail="handleDetail"/>
    <!--模态框-->
    <el-dialog :visible.sync="dialogVisibleForTask" title="任务详情" width="70%">
      <div><pre>{{ exce_result }}</pre></div>
    </el-dialog>
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
import { autoaskList, updateautoask, detailautoask } from '@/api/tasks/tasks'
import TasksList from './table'
export default {
  name: 'Tasks',
  components: {
    TasksList
  },
  data() {
    return {
      autoasks: [],
      total: 0,
      dialogVisibleForTask: false,
      exce_result: {},
      params: {
        page: 1
      }
    }
  },
  created() {
    this.fetchautoaskerlist()
  },
  methods: {
    fetchautoaskerlist() {
      autoaskList(this.params).then(res => {
        this.autoasks = res.results
        this.total = res.count
      })
    },
    handleEdit(value) {
      const data = { 'status': 'Y' }
      updateautoask(value.id, data).then(res => {
        this.$message({
          message: '执行成功',
          type: 'success'
        })
        this.fetchautoaskerlist()
      })
    },
    handleDetail(id) {
      this.dialogVisibleForTask = true
      detailautoask(id).then(res => {
        console.log(res)
        this.exce_result = res.detail_result
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchautoaskerlist()
    }
  }
}
</script>
<style lang="scss" scoped>
  .task {
    padding: 10px;
  }
  pre {
    font-weight: bold;
    color: white;
    font-size: 16px;
    background-color: black;
  }
</style>
