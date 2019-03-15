<template>
  <div class="add-user-from">
    <el-dialog :visible.sync="visible" title="请输入用户信息" @close="handleClose">
      <el-form ref="addUserForm" :model="form" :rules="rules" label-width="100px">
        <!--prop表示验证的方式，与验证相关-->
        <el-form-item label="登陆名" prop="username">
          <el-input v-model="form.username" placeholder="请输入登陆名"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addUser } from '@/api/user'
export default {
  name: 'AddUserForm',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      form: {
        username: '',
        name: '',
        password: '',
        phone: ''
      },
      rules: {
        username: [
          // required: true不能为空，message: 提示的内容,trigger: 'blur'表示失去光标为事件
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  // watch是监听父组件给子组件传递的信息，val就是props中value的值，要么是false要么是ture
  watch: {
    value(val) {
      this.visible = val
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.resetForm()
    },
    submitForm() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          // res是从api返回的值，api访问有什么就返回什么
          addUser(this.form).then(res => {
            this.$message({
              message: `修改 ${this.form.name} 的状态成功`,
              type: 'success'
            })
            this.handleClose()
            // fetch事件在父组件触发@fetch="handleFetch",主要是重新
            this.$emit('fetch')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.addUserForm.resetFields()
    }
  }
}
</script>
