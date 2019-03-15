<template>
  <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
    <el-table
      v-loading="loading"
      ref="singleTable"
      :data="memberList"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"/>
      <el-table-column
        property="phone"
        label="电话"
        width="120"/>
      <el-table-column
        property="email"
        label="email"
        width="120"/>
      <el-table-column
        property="username"
        label="姓名"/>
      <el-table-column
        fixed="right"
        label="成员管理">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleGroupMember(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="padding-top:20px;">
      <span class="demonstration" />
      <el-pagination
        :total="total"
        :current-page.sync="params.page"
        :page-size="params.page_size"
        layout="prev, pager, next"
        background
        @current-change="handleChange" />
    </el-row>
  </el-dialog>
</template>
<script>
import { getGroupsMenbers, deleteGroupsMenbers } from '@/api/group'
export default {
  name: 'GroupMember',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gid: {
      type: Number,
      default: 0
    },
    gname: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      memberList: [],
      total: 1,
      params: {
        page: 1,
        page_size: 6
      }
    }
  },
  computed: {
    title() {
      return `${this.gname}的成员列表`
    }
  },
  watch: {
    value(val) {
      // if (val === false) return 为了false在调用一下fetchGroupMemberList
      if (val === false) return
      this.visible = val
      this.fetchGroupMemberList()
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.$emit('fetch')
      this.params.page = 1
    },
    fetchGroupMemberList() {
      this.loading = true
      getGroupsMenbers(this.gid, this.params).then(res => {
        this.memberList = res.results
        this.total = res.count
        this.loading = false
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchGroupMemberList()
    },
    handleGroupMember(obj) {
      deleteGroupsMenbers(this.gid, { uid: obj.id }).then(res => {
        this.fetchGroupMemberList()
        if (res.status === 0) {
          this.$message({
            message: `删除用户组 ${this.gname} 的 ${obj.username}用户成功`,
            type: 'success'
          })
        } else {
          this.$message({
            message: `删除用户组 ${this.gname} 的 ${obj.username}用户失败，${res.errmsg}`,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

