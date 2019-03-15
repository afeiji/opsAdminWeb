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
        label="出版社"/>
      <el-table-column
        prop="address"
        label="地址"/>
      <el-table-column
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
export default {
  name: 'PublishList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleEdit(value) {
      // console.log(value)
      this.$emit('edit', value)
    },
    handleDelete(value) {
      this.$emit('delete', value)
    }
  }
}
</script>
