<template>
  <div class="add-user-from">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city" placeholder="请输入城市"/>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'PublishForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          name: '',
          city: '',
          addreee: ''

        }
      }
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (!valid) {
          return
        }
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
