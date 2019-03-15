<template>
  <div>
    <el-table
      v-if="true"
      :data="value"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <span><pre>上线详情：{{ props.row.detail }}</pre></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"/>
      <el-table-column
        prop="version"
        label="项目版本"/>
      <el-table-column
        prop="applicant.name"
        label="申请人"/>
      <el-table-column
        prop="reviewer.name"
        label="审核人"/>
      <el-table-column
        prop="assign_to.name"
        label="上线人"/>
      <el-table-column
        prop="status.name"
        label="上线状态"/>
      <el-table-column
        prop="apply_time"
        label="申请时间"/>
      <el-table-column
        prop="deploy_time"
        label="上线时间"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ReleaseList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleDetail(value) {
      const id = value.id
      this.$emit('detail', id)
    }
  }
}
</script>
