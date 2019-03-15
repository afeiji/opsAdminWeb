<template>
  <div>
    <el-table
      v-if="true"
      :data="value"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="任务名称"/>
      <el-table-column
        :formatter="formatPlayBook"
        prop="playbook"
        label="Playbook"/>
      <el-table-column
        :formatter="formatStatus"
        prop="status"
        label="执行状态"/>
      <el-table-column
        prop="add_time"
        label="执行时间"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">执行</el-button>
          <el-button type="danger" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TasksList',
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
      this.$emit('edit', value)
    },
    handleDetail(task) {
      const id = task.id
      this.$emit('detail', id)
    },
    formatStatus: function(row, column) {
      return row.status === 'Y' ? '已执行' : '未执行'
    },
    formatPlayBook: function(row, column) {
      return row.playbook.split('task')[1]
    }
  }
}
</script>
