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
          <span><pre>处理结果：{{ props.row.result_desc }}</pre></span>
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
        prop="assign_to.name"
        label="指派人"/>
      <el-table-column
        prop="final_processor.name"
        label="处理人"/>
      <el-table-column
        prop="status.name"
        label="工单状态"/>
      <el-table-column
        :formatter="dateFormat"
        prop="apply_time"
        label="申请时间"/>
      <el-table-column
        :formatter="dateFormat"
        prop="complete_time"
        label="处理时间"/>
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
      console.log(value.applicant)
      this.$emit('edit', value)
    },
    handleDelete(value) {
      this.$confirm(`是否取消 ${value.title} 工单`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
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
