<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!--@keyup.enter.native表示回车也调用handleSearch方法-->
        <!--搜索-->
        <el-input v-model="params.name" placeholder="搜索用户名" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button type="primary" @click="dialogVisibleForAdd=true">添加出版商</el-button>
      </el-col>
    </el-row>

    <!--子组件 表格  @edit表示触发子组件所对应的函数，父组件的handleEdit和子组件的handleEdit完全分开的-->
    <PublishList :value="publishs" @edit="handleEdit" @delete="handleDelete"/>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%">
      <publish-form
        ref="publishForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd" />
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <publish-form
        ref="publishForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit" />
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
import { getPulishList, updatePublish, deletePublish, createPublish } from '@/api/books/publish'
import PublishList from './table'
import PublishForm from './form'

export default {
  name: 'Publish',
  components: {
    PublishList,
    PublishForm
  },
  data() {
    return {
      publishs: [],
      total: 0,
      params: {
        page: 1,
        name: ''
      },
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {}
    }
  },
  created() {
    this.fetchPulishList()
  },
  methods: {
    fetchPulishList() {
      getPulishList(this.params).then(res => {
        this.publishs = res.results
        // console.log(this.publishs)
        this.total = res.count
      })
    },
    // val是当前的页面数，从前端传过来的，无须犹豫
    handleChange(val) {
      this.params.page = val
      console.log(val)
      this.fetchPulishList()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchPulishList()
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.publishForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },
    handleEdit(value) {
      // console.log(value)
      this.dialogVisibleForEdit = true
      this.currentValue = value
    },
    handleSubmitEdit(value) {
      // const { id, ...params } = value
      updatePublish(value.id, value).then(() => {
        this.$message({
          message: `修改出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchPulishList()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.publishForm.$refs.form.resetFields()
    },
    handleDelete(value) {
      deletePublish(value.id).then(() => {
        this.$message({
          message: `删除出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.fetchPulishList()
      })
    },
    handleSubmitAdd(value) {
      createPublish(value).then(() => {
        this.$message({
          message: `添加出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchPulishList()
      })
    }
  }
}
</script>
