<template>
  <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
    <el-transfer v-model="groupPermission" :data="data" :titles="transferTitle" filterable filter-placeholder="请输入搜索内容"/>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleUpdateGroupPermission">提交修改</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getPermissionList, getGroupPermissionList, updateGroupPermissionList } from '@/api/permission'
export default {
  name: 'GroupPermission',
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
      groupPermission: [],
      data: [],
      params: {
        page: 1,
        page_size: 6
      }
    }
  },
  computed: {
    title() {
      return `${this.gname}的权限列表`
    },
    transferTitle() {
      return ['权限点', `${this.gname}的权限`]
    }
  },
  watch: {
    value(val) {
      // if (val === false) return 为了false在调用一下fetchGroupMemberList
      if (val === false) return
      this.visible = val
      this.fetchPermissionList()
      this.fetchGroupPermissionList()
      this.groupPermission = []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
    },
    fetchPermissionList() {
      getPermissionList({ page_size: 0 }).then(res => {
        this.data = res
      })
    },
    fetchGroupPermissionList() {
      getGroupPermissionList(this.gid, { page_size: 0 }).then(res => {
        res.forEach((item) => {
          // 这里传递item.id都可以,要结合后端
          this.groupPermission.push(item.key)
        })
      })
    },
    handleUpdateGroupPermission() {
      updateGroupPermissionList(this.gid, { pids: this.groupPermission }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: `修改用户组 ${this.gname} 的 权限成功`,
            type: 'success'
          })
        }
        this.fetchPermissionList()
        this.handleClose()
      })
    }
  }
}
</script>
<style>
  .el-transfer-panel{width:40%}
</style>
