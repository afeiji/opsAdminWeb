<template>
  <div class="modify-group-form">
    <!--:title是固定写法-->
    <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
      <!--ref="groupForm"重置的时候调用-->
      <el-form ref="groupForm" :model="form" :rules="rules" label-width="100px">
        <!--prop表示验证的方式，与验证相关-->
        <el-form-item label="用户组" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户组"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { modfiyGroup, addGroup } from '@/api/group'
export default {
  name: 'ModifyGroup',
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
      groupId: 0,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      if (this.groupId === 0) return '创建用户组'
      else return '修改用户组'
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    gname(val) {
      if (val === 0) return
      this.form.name = val
    },
    gid(val) {
      this.groupId = val
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      // this.groupId = 0
      this.form.name = ''
      this.resetForm()
      // this.$emit('input', false)把值传回到父组件，下次才能再次打开dialog
      this.$emit('input', false)
    },
    resetForm() {
      this.$refs.groupForm.resetFields()
      if (this.groupId === 0) this.form.name = ''
    },
    submitForm() {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          this.save()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    save() {
      if (this.groupId === 0) {
        this.create()
      } else {
        this.update()
      }
    },
    update() {
      modfiyGroup(this.groupId, this.form).then(() => {
        this.$message({
          message: `修改用户组 ${this.form.name} 成功`,
          type: 'success'
        })
        this.handleClose()
        this.$emit('fetch')
      })
    },
    create() {
      addGroup(this.form).then(res => {
        this.$message({
          message: `添加用户组 ${this.form.name} 成功`,
          type: 'success'
        })
        this.handleClose()
        this.$emit('fetch')
      })
    }
  }
}
</script>
