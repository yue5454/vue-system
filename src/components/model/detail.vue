<template>
  <el-row v-loading='loading'>
    <!-- operate bar -->
    <el-col :span='24' class="operation-bar">
      <el-col :span='12' class='det_tit'>
        <label>
          <i class="iconfont icon-wenjian"></i>
          <span>{{model_id}}</span>
        </label>
      </el-col>
      <el-col :span='12' class="ope-button">
        <router-link :to="{path: `/model_edit/${model_id}`}">
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
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import { modelInfo } from '@/api/api'

  let thisVue = null;
  export default {
    data () {
      return {
        model_id: '',
        loading: true,
        activeNames: ['1','2','3'],
        info: null
      }
    },
    methods: {
      getInfo () {
        modelInfo({model_id:thisVue.model_id}).then(json => {
          let {id, model, platform, type, vendor} = json.data
          thisVue.info = {id, model, platform, type, vendor}
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      }
    },
    mounted () {
      thisVue = this
      thisVue.model_id = thisVue.$route.params.id
      thisVue.getInfo()
    }
  }
</script>
<style>
  @import '../../assets/style/detail.css'
</style>