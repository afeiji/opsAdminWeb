<template>
  <div>
    <AuthorList :value="authors"/>
  </div>
</template>
<script>
import { getAuthorsList } from '@/api/books/author'
import AuthorList from './table'

export default {
  name: 'Author',
  components: {
    AuthorList
  },
  data() {
    return {
      authors: [],
      count: 0
    }
  },
  created() {
    this.fetchAuthodList()
  },
  methods: {
    fetchAuthodList() {
      getAuthorsList().then(res => {
        this.authors = res.results
        this.count = res.count
      })
    }
  }
}
</script>
