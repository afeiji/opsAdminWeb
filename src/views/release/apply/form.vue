<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="选择项目" prop="name">
        <el-select v-loading="loadvalue" v-model="form.name" filterable placeholder="请选择项目，可搜索" style="width: 60%;" @change="getTag">
          <el-option
            v-for="item in project_list"
            :key="item.index"
            :label="item.name"
            :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="项目版本" prop="version">
        <el-select v-model="form.version" placeholder="请选择项目版本" style="width: 60%;" @change="getTaginfo">
          <el-option
            v-for="item in tag_list"
            :key="item.index"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="版本信息" prop="info">
        <el-input v-model="form.info" style="width: 60%;" readonly=""/>
      </el-form-item>
      <el-form-item label="审核人">
        <!--为el-select设置clearable属性，则可将选择器清空。需要注意的是，clearable属性仅适用于单选。-->
        <el-select v-model="form.reviewer" placeholder="请选择审核人" clearable style="width: 60%;">
          <el-option
            v-for="item in reviewer_list"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上线人" prop="assign_to" >
        <el-select v-model="form.assign_to" placeholder="请选择上线人" style="width: 60%;">
          <el-option
            v-for="item in sa_list"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上线详情" prop="detail">
        <!--当选择type为textarea时，输入是可以回车的-->
        <el-input v-model="form.detail" type="textarea" rows="8" placeholder="请输入上线详情" style="width: 60%;"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { projectList, projectTagList } from '@/api/project/project'
import { getGroupsMenbers } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  name: 'ApplyForm',
  data() {
    return {
      form: {
        type: Object,
        default() {
          return {
            name: '',
            version: '',
            info: '',
            reviewer: '',
            assign_to: ''
          }
        }
      },
      options: [],
      loadvalue: false,
      project_list: [],
      tag_list: [],
      sa_list: [],
      reviewer_list: [],
      state: 0,
      params: {
        username: ''
      },
      rules: {
        name: [
          { required: true, message: '"请选择项目', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请选择项目版本', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '版本信息', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入上线详情', trigger: 'blur' }
        ],
        assign_to: [
          { required: true, message: '请选择上线人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    state() {
      // 1是用户组的ID，1是运维,getGroupsMenbers是用户组的api，具体查看用户组项目,公司用户组ID是：1，家里是27
      getGroupsMenbers(1).then(res => {
      // getGroupsMenbers(27).then(res => {
        this.sa_list = res.results
      })
      // 假设1是审核组的ID，1是审核,getGroupsMenbers是用户组的api，具体查看用户组项目,公司用户组ID是：1，家里是27
      getGroupsMenbers(3).then(res => {
      // getGroupsMenbers(27).then(res => {
        this.reviewer_list = res.results
      })
      projectList(this.params).then(res => {
        this.project_list = res.result
        this.loadvalue = false
      })
    }
  },
  created() {
    this.loadvalue = true
    this.state = 1
    this.params.username = this.name
  },
  methods: {
    getTag(name) {
      // console.log(id)
      let obj = {}
      obj = this.project_list.find((item) => {
        return item.name === name
      })
      // const声明一个变量
      const params = { 'project_id': obj.id }
      projectTagList(params).then(res => {
        this.tag_list = res
      })
    },
    getTaginfo(name) {
      // 不能直接拿name去name.attributes.get('message')，这里的name不是一个对象
      let obj = {}
      obj = this.tag_list.find((item) => {
        return item.name === name
      })
      // console.log(obj)
      this.form.info = obj.info
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.form)
      })
    }
  }
}
</script>
