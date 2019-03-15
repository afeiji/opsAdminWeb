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
        prop="status.name"
        label="上线状态"/>
      <el-table-column
        prop="apply_time"
        label="申请时间"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button v-if="deletedeployPerm" type="primary" size="mini" @click="handleEdit(scope.row)">处理</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">取消上线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { checkPermission } from '@/utils/auth'
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
  computed: {
    deletedeployPerm: function() {
      return checkPermission('release.delete_deploy')
    }
  },
  methods: {
    handleEdit(value) {
      this.$emit('edit', value)
    },
    handleDelete(value) {
      const name = value.name
      this.$confirm(`是否取消 ${name} 上线单`, {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      }).then(() => {
        // this.$emit('delete', id)
        this.$emit('delete', value)
      })
    }
  }
}
</script>
