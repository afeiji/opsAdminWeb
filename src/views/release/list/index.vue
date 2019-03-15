<template>
  <div>
    <el-col :span="12">
      <!--@keyup.enter.native表示回车也调用handleSearch方法-->
      <!--搜索-->
      <el-input v-model="params.name" placeholder="搜索项目名称" @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
      </el-input>
    </el-col>
    <ReleaseList :value="releases" @edit="handleEdit" @delete="handleDelete"/>
    <!--上线进度-->
    <el-dialog
      :visible.sync="dialogVisibleForRate">
      <div style="height: 500px;">
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step
            v-for="item in online_status"
            :title="item"
            :key="item"
          />
        </el-steps>
        <br>
        <!--处理详情子组件-->
        <OrderForm :form="form_result" :loading="loadvalue" @next="handlenext"/>
      </div>
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
import { releaseList, updaterelease } from '@/api/release/release'
import ReleaseList from './table'
import OrderForm from './form'
export default {
  // name中字符串第一个字母要大写
  name: 'Release',
  components: {
    ReleaseList,
    OrderForm
  },
  data() {
    return {
      releases: [],
      total: 0,
      dialogVisibleForRate: false,
      active: 1,
      rate: [],
      online_status: [],
      form_result: {},
      loadvalue: false,
      params: {
        name: '',
        detail: '',
        page: 1,
        status: 0
      }
    }
  },
  created() {
    this.fetchreleaselist()
  },
  methods: {
    fetchreleaselist() {
      releaseList(this.params).then(res => {
        // console.log(typeof (res.results))
        this.releases = res.results
        this.total = res.count
      })
    },
    handleEdit(value) {
      this.dialogVisibleForRate = true
      // 灰度环境暂时没有任何操作，后端之后在status = 3 时触发了动作
      this.online_status = ['申请', '审核', '灰度', '上线']
      this.form_result = value
      this.params.status = value.status.id
      this.active = this.params.status + 1
    },
    handleSearch() {
      this.params.page = 1
      this.fetchreleaselist()
    },
    handleChange(val) {
      this.params.page = val
      this.fetchreleaselist()
    },
    handleDelete(value) {
      const data = { 'status': 4 }
      updaterelease(value.id, data).then(res => {
        this.$message({
          message: `${value.name}已取消上线`,
          type: 'success'
        })
        this.params.page = 1
        this.fetchreleaselist()
      })
    },
    handlenext(value) {
      const { id, ...params } = value
      // name和version是更新时传值给jenkins
      const online_status = { 'status': this.params.status + 1, 'name': params.name, 'version': params.version }
      this.loadvalue = true
      updaterelease(id, online_status).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.loadvalue = false
        this.fetchreleaselist()
        this.dialogVisibleForRate = false
      })
    }
  }
}
</script>
