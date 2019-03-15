<template>
  <div class="modify-user-form">
    <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
      <el-form ref="modifyUserForm" :model="form" :rules="rules" label-width="100px">
        <!--prop表示验证的方式，与验证相关-->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getUser, modfiyUser } from '@/api/user'
export default {
  name: 'ModifyUser',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      userObj: null,
      title: '',
      form: {
        phone: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    userId(val) {
      this.userId = val
      this.fetchUser()
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.resetForm()
    },
    resetForm() {
      this.$refs.modifyUserForm.resetFields()
      this.form.phone = this.userObj.phone
    },
    submitForm() {
      this.$refs.modifyUserForm.validate((valid) => {
        if (valid) {
          modfiyUser(this.userId, this.form).then(() => {
            this.$message({
              message: `修改用户 ${this.userObj.name} 手机号成功`,
              type: 'success'
            })
            // this.visible = false表示修改成功后，关闭dialog
            this.handleClose()
            // 刷新重新加载，然后在父组件监听fetch: @fetch="handleFetch"，重新渲染:data="userList"
            this.$emit('fetch')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchUser() {
      // res是从api返回的值，api访问有什么就返回什么
      getUser(this.userId).then(res => {
        this.title = `修改 ${res.name} 的信息`
        this.form.phone = res.phone
        this.userObj = res
      })
    }
  }
}
</script>
