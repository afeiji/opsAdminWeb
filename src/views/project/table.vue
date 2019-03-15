<template>
  <div>
    <el-table
      v-loading="loading"
      :data="value"
      stripe
      style="width: 100%">
      <el-table-column
        prop="path_with_namespace"
        label="项目名称"/>
      <el-table-column
        prop="description"
        label="项目描述"/>
      <el-table-column
        prop="web_url"
        label="项目地址"/>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ProjectList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
