<template>
  <div class="add-user-from">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="工单类型">
        <el-select v-model="form.type" placeholder="请选择工单类型" style="width: 60%;">
          <el-option
            v-for="item in type_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="工单标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入工单标题" style="width: 60%;"/>
      </el-form-item>
      <el-form-item label="工单内容" prop="order_contents">
        <!--当选择type为textarea时，输入是可以回车的-->
        <el-input v-model="form.order_contents" type="textarea" rows="8" placeholder="请输入工单内容" style="width: 60%;"/>
      </el-form-item>
      <el-form-item label="指派给">
        <el-select v-model="form.assign_to" placeholder="请选择指派人" style="width: 60%;">
          <el-option
            v-for="item in sa_list"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
        <el-button size="small" @click="cancel">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getGroupsMenbers } from '@/api/group'
export default {
  name: 'ApplyForm',
  data() {
    return {
      form: {},
      options: [],
      type_list: [{ 'id': 0, 'name': '数据库' }, { 'id': 1, 'name': '计划任务' }, { 'id': 2, 'name': '配置文件' }, { 'id': 3, 'name': 'WEB服务' }, { 'id': 4, 'name': '其它' }],
      sa_list: [],
      publish_list: [],
      author_list: [],
      state: 0,
      rules: {
        type: [
          { required: true, message: '"请选择工单类型', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入工单标题', trigger: 'blur' }
        ],
        order_contents: [
          { required: true, message: '请输入工单内容', trigger: 'blur' }
        ],
        assign_to: [
          { required: true, message: '请选择指派人', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    state() {
      // 1是用户组的ID，1是运维,getGroupsMenbers是用户组的api，具体查看用户组项目
      getGroupsMenbers(1).then(res => {
        this.sa_list = res.results
      })
    }
  },
  created() {
    this.state = 1
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
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
