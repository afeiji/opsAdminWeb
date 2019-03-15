<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!--@keyup.enter.native表示回车也调用handleSearch方法-->
        <!--搜索-->
        <el-input v-model="params.name" placeholder="搜索书名" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button v-if="addBookPerm" type="primary" @click="dialogVisibleForAdd=true">添加出版商</el-button>
      </el-col>
    </el-row>
    <!--子组件表格-->
    <BookList :value="books" @edit="handleEdit" @delete="handleDelete"/>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%"
      @close="handleCancelAdd">
      <BookForm
        ref="BookForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd" />
    </el-dialog>
    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%"
      @close="handleCancelEdit">
      <BookForm
        ref="BookForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit" />
    </el-dialog>
    <!--分页-->
    <el-row type="flex" justify="center" style="padding-top:20px;">
      <span class="demonstration" />
      <el-pagination
        :total="total"
        layout="prev, pager, next"
        background
        @current-change="handleChange" />
    </el-row>
  </div>
</template>
<script>
import { getBooksList, deleteBooks, updateBooks, createBooks } from '@/api/books/book'
import BookList from './table'
import BookForm from './form'
import { checkPermission } from '@/utils/auth'
export default {
  name: 'Book',
  components: {
    BookList,
    BookForm
  },
  data() {
    return {
      total: 0,
      books: [],
      params: {
        page: 1,
        name: ''
      },
      currentValue: {},
      dialogVisibleForEdit: false,
      dialogVisibleForAdd: false
    }
  },
  computed: {
    addBookPerm: function() {
      return checkPermission('books.add_book')
    }
  },
  created() {
    this.fetchBooklist()
  },
  methods: {
    fetchBooklist() {
      getBooksList(this.params).then(res => {
        this.books = res.results
        this.total = res.count
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchBooklist()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchBooklist()
    },
    handleEdit(value) {
      // this.currentValue = value
      this.currentValue = { ...value }
      // console.log(this.currentValue['publisher'][0].id)
      this.currentValue['authors'] = this.currentValue['authors'].map(it => it.id)
      this.currentValue['publisher'] = this.currentValue['publisher'][0].id
      this.dialogVisibleForEdit = true
    },
    handleSubmitEdit(value) {
      const { id, ...params } = value
      console.log(id)
      console.log(params)
      updateBooks(value.id, value).then(res => {
        this.$message({
          message: `修改出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchBooklist()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.BookForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },
    handleDelete(value) {
      deleteBooks(value.id).then(res => {
        this.$message({
          message: `删除出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.fetchBooklist()
      })
    },
    handleSubmitAdd(value) {
      createBooks(value).then(res => {
        this.$message({
          message: `添加出版商 ${value.name} 成功`,
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchBooklist()
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.BookForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    }
  }
}
</script>
