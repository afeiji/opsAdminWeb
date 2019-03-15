<template>
  <div>
    <el-form
      v-loading="loading"
      ref="form"
      :model="form"
      element-loading-text="Loading"
      label-width="100px"
      style="padding-bottom:20px;">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="选择项目" prop="name">
        <el-input v-model="form.name" readonly=""/>
      </el-form-item>
      <el-form-item label="项目版本" prop="version">
        <el-input v-model="form.version" readonly=""/>
      </el-form-item>
      <el-form-item label="版本信息" prop="info">
        <el-input v-model="form.info" readonly=""/>
      </el-form-item>
      <el-form-item label="上线详情" prop="detail">
        <!--当选择type为textarea时，输入是可以回车的-->
        <el-input v-model="form.detail" type="textarea" rows="8" />
      </el-form-item>
    </el-form>
    <el-col :span="12" align="right" style="padding-right:20px;">
      <el-button type="primary" size="mini" align="right" @click="handlenext">下一步</el-button>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'OrderForm',
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlenext() {
      // console.log(this.form)
      this.$emit('next', this.form)
    }
  }
}
</script>
