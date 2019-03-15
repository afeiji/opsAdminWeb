<template>
  <div>
    <el-table
      :data="value"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"/>
      <el-table-column
        prop="name"
        label="书名"/>
      <el-table-column
        prop="publication_date"
        label="出版时间"/>
      <el-table-column
        prop="publisher"
        label="出版社"
        type="scope">
        <template slot-scope="scope">
          {{ scope.row.publisher[0].name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="authors"
        label="作者">
        <template slot-scope="scope">
          <div v-for="item in scope.row.authors" :key="item.num">
            <span style="float: left">{{ item.name }},</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="addBookPerm"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { checkPermission } from '@/utils/auth'
export default {
  name: 'BookList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    addBookPerm: function() {
      return checkPermission('books.add_book')
    }
  },
  methods: {
    handleEdit(value) {
      this.$emit('edit', value)
    },
    handleDelete(value) {
      this.$emit('delete', value)
    }
  }
}
</script>
