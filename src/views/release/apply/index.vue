<template>
  <div>
    <!--子组件-->
    <ApplyForm ref="form" @submit="submitForm"/>
  </div>
</template>
<script>
import { createrelease } from '@/api/release/release'
import ApplyForm from './form'
export default {
  name: 'Apply',
  components: {
    ApplyForm
  },
  methods: {
    submitForm(value) {
      createrelease(value).then(res => {
        this.$message({
          message: '创建工单成功',
          type: 'success'
        })
        this.$router.push({ path: '/release/list' })
      })
    }
  }
}
</script>
