<template>
  <div>
    <el-col :span="12">
      <!--@keyup.enter.native表示回车也调用handleSearch方法-->
      <!--搜索-->
      <el-input v-model="params.name" placeholder="搜索项目名称" @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
      </el-input>
    </el-col>
    <ReleaseList :value="releases" @detail="handleDetail"/>
    <!--模态框-->
    <el-dialog :visible.sync="dialogVisibleForRelease" title="任务详情" width="70%">
      <div><pre>{{ exce_result }}</pre></div>
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
import { releaseList, detailrelease } from '@/api/release/release'
import ReleaseList from './table'
export default {
  name: 'Release',
  components: {
    ReleaseList
  },
  data() {
    return {
      releases: [],
      total: 0,
      params: {
        page: 1,
        name: '',
        status: 3
      },
      dialogVisibleForRelease: false,
      exce_result: {}
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
    handleDetail(id) {
      detailrelease(id).then(res => {
        this.dialogVisibleForRelease = true
        this.exce_result = res.console_output
      })
    },
    handleSearch() {
      this.page = 1
      this.fetchreleaselist()
    },
    handleChange(val) {
      this.params.page = val
      this.fetchreleaselist()
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
