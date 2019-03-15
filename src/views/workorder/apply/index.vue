<template>
  <div>
    <!--子组件-->
    <ApplyForm ref="form" @submit="fetchSubmiForm" @cancel="fetchCancel"/>
  </div>
</template>
<script>
import { createworkorders } from '@/api/workorder/workorder'
import ApplyForm from './form'
export default {
  name: 'Apply',
  components: {
    ApplyForm
  },
  data() {
    return {
      total: 0,
      workorders: [],
      params: {
        page: 1,
        name: ''
      },
      currentValue: {},
      dialogVisibleForEdit: false,
      dialogVisibleForAdd: false
    }
  },
  methods: {
    fetchSubmiForm(value) {
      createworkorders(value).then(res => {
        this.$message({
          message: '创建工单成功',
          type: 'success'
        })
        this.$router.push({ path: '/workorder/list' })
      })
    },
    fetchCancel() {
      this.$refs.form.$refs.form.resetFields()
    }
  }
}
</script>
