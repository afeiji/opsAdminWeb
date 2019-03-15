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
    <WorkorderList :value="workorders" @delete="handleDelete" @rate="handleRate" @edit="handleEdit"/>
    <!--任务进度-->
    <el-dialog
      :title="currentValue.title"
      :visible.sync="dialogVisibleForRate"
      width="30%"
      @close="handleClose">
      <div style="height: 300px;">
        <el-steps :active="active" direction="vertical" finish-status="success">
          <el-step
            v-for="(item,index) in rate"
            :title="item.title"
            :description="item.description"
            :key="index" />
        </el-steps>
      </div>
    </el-dialog>
    <!--模态框工单处理-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="工单处理"
      width="50%">
      <OrderForm
        ref="form"
        :form="currentValue"
        @submit="submitForm"
        @cancel="handleCancelEdit"/>
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
import { workordersList, updateworkorders } from '@/api/workorder/workorder'
import WorkorderList from './table'
import OrderForm from './form'
import { checkPermission } from '@/utils/auth'
export default {
  name: 'Workorder',
  components: {
    WorkorderList,
    OrderForm
  },
  data() {
    return {
      total: 0,
      workorders: [],
      params: {
        page: 1,
        title: '',
        status: 1
      },
      currentValue: {},
      dialogVisibleForRate: false,
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      active: 1,
      apply: {},
      assign: {},
      rate: []
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
    handleDelete(id) {
      const data = { 'status': 3 }
      updateworkorders(id, data).then(res => {
        this.$message({
          message: '拒绝成功',
          type: 'success'
        })
        this.fetchworkorderlist()
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchworkorderlist()
    },
    handleRate(value) {
      console.log(value)
      this.currentValue = { ...value }
      this.dialogVisibleForRate = true
      this.rate = []
      this.final_processor = {}
      this.apply['title'] = '任务申请: ' + value.applicant.name + ': ' + value.apply_time
      this.assign['title'] = '任务分配: ' + value.assign_to.name
      console.log(this.apply['title'])
      if (value.final_processor) {
        this.final_processor['title'] = '任务领取: ' + value.final_processor.name + ': ' + value.complete_time
        this.active = 3
      }
      this.rate.push(this.apply)
      this.rate.push(this.assign)
      this.rate.push(this.final_processor)
    },
    handleClose() {
      this.active = 1
    },
    handleEdit(value) {
      this.currentValue = { ...value }
      const data = { 'status': 1 }
      const id = this.currentValue.id
      updateworkorders(id, data).then(res => {
        this.$message({
          message: `接收工单`,
          type: 'success'
        })
        this.dialogVisibleForEdit = true
        this.fetchworkorderlist()
      })
    },
    submitForm(value) {
      const { id, ...params } = value
      const data = { 'status': 2, 'result_desc': params.result_desc }
      updateworkorders(id, data).then(res => {
        this.$message({
          message: `更新成功`,
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchworkorderlist()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.form.$refs.form.resetFields()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchworkorderlist()
    }
  }
}
</script>
