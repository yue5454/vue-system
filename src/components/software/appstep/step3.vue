<template>
  <el-row>
    <el-col :span='24'>
      <div class='step-success'>
        <div class='title'><i class='iconfont icon-duigou'></i> create successfully</div>
        <div class='go-link'>please click <router-link to='/app_list'>"app list"</router-link> to go to app list</div>
        <div class="auto-link">auto link <strong>{{timeOut}}</strong>s later</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        time_delay: 5,
        time_out: null
      }
    },
    computed: {
      timeOut: function () {
        return this.time_delay
      }
    },
    mounted () {
      this.time_out = setInterval(() => {
        if (this.time_delay == 0) {
          window.clearInterval(this.time_out)
          this.$router.push('/app_list')
        } else {
          this.time_delay--
        }
      }, 1000)
    }
  }
</script>