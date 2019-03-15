<template>
  <div>
    <el-table
      v-if="true"
      :data="value"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"/>
      <el-table-column type="expand">
        <template slot-scope="props">
          <span><pre>工单详情：{{ props.row.order_contents }}</pre></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type.name"
        label="工单类型"/>
      <el-table-column
        prop="title"
        label="工单标题"/>
      <el-table-column
        prop="applicant.name"
        label="申请人"/>
      <el-table-column
        prop="status.name"
        label="工单状态"/>
      <el-table-column
        label="任务进度">
        <template slot-scope="scope">
          <el-button type="text" size="smalls" @click="handleRate(scope.row)">
            {{ '任务进度' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        prop="apply_time"
        label="申请时间"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button v-if="changePerm" type="primary" size="mini" @click="handleEdit(scope.row)">处理</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from 'moment'
import { checkPermission } from '@/utils/auth'
export default {
  name: 'WorkorderList',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    changePerm: function() {
      return checkPermission('workorder.change_workorder')
    }
  },
  watch: {
    value(val) {
      console.log(val[0])
    }
  },
  methods: {
    handleEdit(value) {
      this.$emit('edit', value)
    },
    handleDelete(value) {
      const id = value.id
      const title = value.title
      this.$confirm(`是否拒绝 ${title} 工单`, {
        confirmButtonText: '确定',
        cancelButtonText: '拒绝',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已拒绝'
        })
      })
    },
    handleRate(value) {
      this.$emit('rate', value)
    },
    dateFormat: function(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:MM:ss')
    }
  }
}
</script>
