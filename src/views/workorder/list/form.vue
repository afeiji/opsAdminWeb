<template>
  <div class="add-user-from">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="工单标题" prop="title">
        <el-input v-model="form.title" readonly=""/>
      </el-form-item>
      <el-form-item label="工单内容" prop="order_contents">
        <el-input v-model="form.order_contents" readonly=""/>
      </el-form-item>
      <el-form-item label="处理结果" prop="result_desc">
        <el-input v-model="form.result_desc"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm">保存</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'OrderForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          title: '',
          order_contents: '',
          result_desc: ''
        }
      }
    }
  },
  data() {
    return {
      publish_list: [],
      author_list: [],
      state: 0,
      rules: {
        result_desc: [
          { required: true, message: '请输入处理结果', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.state = 1
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
