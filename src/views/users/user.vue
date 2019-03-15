<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <!--@keyup.enter.native表示回车也调用handleSearch方法-->
        <el-input v-model="params.username" placeholder="搜索用户名" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button v-if="addGroupPerm" type="primary" @click="addUserVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="end" style="padding-right:20px;">-->
    <!--<el-button type="primary" @click="addUserVisible=true">添加用户</el-button>-->
    <!--</el-row>-->
    <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="email"
        label="邮箱"/>
      <el-table-column
        prop="is_active"
        label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_active" @change="handleUserStatusChange(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="last_login"/>
      <el-table-column
        v-if="operationPerm"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleAssignGroup(scope.row)">指定角色</el-button>
          <el-button type="text" size="mini" @click="handleModify(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="padding-top:20px;">
      <span class="demonstration" />
      <el-pagination
        :total="total"
        layout="prev, pager, next"
        background
        @current-change="handleChange" />
    </el-row>
    <AddUserForm v-model="addUserVisible" @fetch="handleFetch"/>
    <ModifyUser v-model="modifyUserVisible" :user-id="userId" @fetch="handleFetch"/>
    <!--user-id是在子组件props中定义了userId接收参数-->
    <AssignGroup v-model="assignGroupVisible" :user-id="userId" :user-name="userName" @fetch="handleFetch"/>
  </div>
</template>
<script>
import { getUserList, modfiyUser, deleteUser } from '@/api/user'
import { checkPermission } from '@/utils/auth'
// 父组件引用子组件
import AddUserForm from './component/addUserForm'
import ModifyUser from './component/modifyUser'
import AssignGroup from './component/assignGroup'
export default {
  name: 'UserList',
  // 挂载组件AddUserForm，刚刚import进来的都要挂载
  components: {
    AddUserForm,
    ModifyUser,
    AssignGroup
  },
  data() {
    return {
      userList: [],
      addUserVisible: false,
      modifyUserVisible: false,
      userId: 0,
      total: 0,
      params: {
        page: 1,
        username: ''
      },
      assignGroupVisible: false,
      userName: ''
    }
  },
  computed: {
    addGroupPerm: function() {
      return checkPermission('users.add_user')
    },
    operationPerm: function() {
      return checkPermission('users.add_user')
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    fetchUserList() {
      // 分页的重点是把参数带过来带API
      getUserList(this.params).then(res => {
        this.userList = res.results
        this.total = res.count
      })
    },
    handleUserStatusChange(obj) {
      modfiyUser(obj.id, { is_active: obj.is_active }).then(() => {
        this.$message({
          message: `修改 ${obj.username} 的状态成功`,
          type: 'success'
        })
      })
    },
    handleFetch() {
      this.fetchUserList()
    },
    handleModify(obj) {
      this.userId = obj.id
      this.modifyUserVisible = true
    },
    // val是当前的页面数，从前端传过来的
    handleChange(val) {
      this.params.page = val
      this.fetchUserList()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchUserList()
    },
    handleAssignGroup(obj) {
      this.assignGroupVisible = true
      this.userId = obj.id
      this.userName = obj.username
    },
    handleDelete(obj) {
      this.$confirm(`是否删除用户 ${obj.username} `, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(obj.id).then(res => {
          this.$message({
            message: `删除用户 ${obj.username} 成功`,
            type: 'success'
          })
          this.fetchUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
