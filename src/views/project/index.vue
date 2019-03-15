<template>
  <div>
    <el-col :span="12">
      <!--@keyup.enter.native表示回车也调用handleSearch方法-->
      <!--搜索-->
      <el-input v-model="params.name" placeholder="搜索项目名称" @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
      </el-input>
    </el-col>
    <ProjectList :value="projects_list" :loading="loadvalue" />
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
import { projectList } from '@/api/project/project'
import ProjectList from './table'
import { mapGetters } from 'vuex'
export default {
  name: 'Project',
  components: {
    ProjectList
  },
  data() {
    return {
      projects_list: [],
      total: 0,
      loadvalue: false,
      params: {
        name: '',
        page: 1,
        username: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchprojectlist()
    this.params.username = this.name
  },
  methods: {
    fetchprojectlist() {
      this.loadvalue = true
      projectList(this.params).then(res => {
        // this.projects_list = res
        this.projects_list = res.result
        this.total = res.count
        this.loadvalue = false
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchprojectlist()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchprojectlist()
    }
  }
}
</script>
