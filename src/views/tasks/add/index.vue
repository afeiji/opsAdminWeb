<template>
  <div>
    <!--子组件表格-->
    <TaskForm :value="form"/>
  </div>
</template>
<script>
import TaskForm from './form'
export default {
  name: 'Tasks',
  components: {
    TaskForm
  },
  data() {
    return {
      form: []
    }
  }
}
</script>
