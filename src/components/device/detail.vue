<template>
  <el-row v-loading='loading'>
    <!-- operate bar -->
    <el-col :span='24' class="operation-bar">
      <el-col :span='12' class='det_tit'>
        <label>
          <el-button type='text' @click='$router.go(-1)'><i class="iconfont icon-back"></i></el-button>
          <span>{{id}}</span>
        </label>
      </el-col>
      <el-col :span='12' class="ope-button">
        <router-link :to="{path: `/device_edit/${id}`}">
          <el-button type='primary' size="small" icon='el-icon-edit'>edit</el-button>
        </router-link>
      </el-col>
    </el-col>
    <!-- detail -->
    <el-col :span='24'>
      <el-collapse v-model='activeNames'>
        <el-collapse-item title='Detail Information' name='1'>
          <ul>
            <li v-for="(value, key) in info" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <!-- tags -->
        <el-collapse-item title="Tags" name='2'>
          <el-button type='default' size='mini' v-for='(value, key) in tags' :key='key' v-text='value.name' ></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import { deviceInfo } from '@/api/api'

  let thisVue = null;
  export default {
    data () {
      return {
        id: '',
        loading: true,
        activeNames: ['1','2','3'],
        info: null,
        tags: []
      }
    },
    methods: {
      getInfo () {
        deviceInfo({id:thisVue.id}).then(json => {
          let {id, model, platform, type, vendor} = json.data.device_info
          thisVue.info = {id, model, platform, type, vendor}
          thisVue.tags = json.data.tags
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      }
    },
    mounted () {
      thisVue = this
      thisVue.id = thisVue.$route.params.id
      thisVue.getInfo()
    }
  }
</script>
<style>
  @import '../../assets/style/detail.css'
</style>