<template>
  <div>
    <el-button type='primary' @click='test'>{{name}}</el-button>
  </div>
</template>

<script>
  import { getUserList } from '@/api/api'

  export default {
    data () {
      return {
        name: 'test'
      }
    },
    methods: {
      test () {
        let params = {'first': '111', 'second': '222'}
        getUserList(params).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>