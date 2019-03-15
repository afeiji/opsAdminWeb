<template>
  <div class="add-user-from">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <!--prop表示验证的方式，与验证相关-->
      <el-form-item label="书名" prop="name">
        <el-input v-model="form.name" placeholder="请输入书名"/>
      </el-form-item>
      <!--<el-form-item label="出版时间" prop="publication_date">-->
      <!--<el-input v-model="form.publication_date" placeholder="请输入出版时间"/>-->
      <!--</el-form-item>-->
      <el-form-item label="出版时间" prop="publication_date">
        <!--<el-input v-model="form.publication_date" placeholder="请输入出版时间"/>-->
        <el-date-picker
          v-model="form.publication_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="作者" prop="authors">
        <el-select v-model="form.authors" multiple filterable style="width: 100px" placeholder="请选择">
          <!--<el-select v-model="form.publisher" multiple placeholder="请选择">-->
          <!--options是一个一个对象，通过res传进来的-->
          <el-option
            v-for="item in author_list"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-select v-model="form.publisher" filterable placeholder="请选择">
          <!--<el-select v-model="form.publisher" multiple placeholder="请选择">-->
          <!--options是一个一个对象，通过res传进来的-->
          <el-option
            v-for="item in publish_list"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getPulishList } from '@/api/books/publish'
import { getAuthorsList } from '@/api/books/author'
export default {
  name: 'BookForm',
  props: {
    form: {
      type: Object,
      default() {
        return {
          name: '',
          publication_date: '',
          addreee: '',
          authors: [],
          publisher: []
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
        name: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        publication_date: [
          { required: true, message: '请输入出版时间', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入出版设', trigger: 'blur' }
        ],
        authors: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    state() {
      getPulishList().then(res => {
        this.publish_list = res.results
        console.log(this.publish_list)
      })
      getAuthorsList().then(res => {
        this.author_list = res.results
      })
    },
    form() {
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
