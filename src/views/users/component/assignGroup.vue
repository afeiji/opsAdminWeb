<template>
  <div class="assign-group">
    <el-dialog :visible.sync="visible" title="指定角色" @close="handleClose">
      <el-form ref="addUserForm" label-width="100px">
        <!--prop表示验证的方式，与验证相关-->
        <el-form-item label="用户名">
          <el-input v-model="userName" readonly />
        </el-form-item>
        <el-form-item label="角色名">
          <el-select v-model="userGroups" multiple placeholder="请选择">
            <!--options是一个一个对象，通过res传进来的-->
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getGroupList, updateUserGroups, getUserGroups } from '@/api/group'
export default {
  name: 'AssignGroup',
  props: {
    // value为什么要这样写，固定写法吗
    value: {
      type: Boolean,
      default: false
    },
    // userId可以直接调用
    userId: {
      type: Number,
      default: 0
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      options: [],
      userGroups: []
    }
  },
  // 打开关闭dialog都会触发watch，所以打开关闭dialog会触发两次watch
  watch: {
    value(val) {
      // if (val <= 0) return设置这个目的是为关闭dialog的时候防止这个函数在调用一次
      if (val <= 0) return
      this.visible = val
      this.fetchGroupList()
      this.fetchUserGroups()
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      // setTimeout(() => {
      //   this.userGroups = []
      //   this.options = []
      // }, 500)
      this.userGroups = []
      this.options = []
      // this.$emit('input', false)把值传回到父组件，下次才能再次打开dialog
    },
    fetchGroupList() {
      // { page_size: 0 }表示不分页，不然又影响
      getGroupList({ page_size: 0 }).then(res => {
        this.options = res
      })
    },
    handleSubmit() {
      // { gids: this.userGroups } 传递给后端，后端接收gids，这是一个字典，通过body data传递
      updateUserGroups(this.userId, { gids: this.userGroups }).then(res => {
        this.$message({
          message: `修改 ${this.userName} 用户组成功`,
          type: 'success'
        })
        this.handleClose()
        // this.$emit('fetch')
      })
    },
    fetchUserGroups() {
      // 为啥是取this.userId，而不是去this.userid，page_size: 0表示不分页
      getUserGroups(this.userId, { page_size: 0 }).then(res => {
        res.forEach((item) => {
          // 这里传递item.id都可以,要结合后端
          this.userGroups.push(item.id)
          // console.log('item: ', item)
        })
      })
    }
  }
}
</script>

