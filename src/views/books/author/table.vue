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
        label="名字"/>
      <el-table-column
        prop="email"
        label="邮箱"/>
      <el-table-column
        prop="phone"
        label="联系方式"/>
      <el-table-column
        prop="address"
        label="地址"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'AuthorList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
