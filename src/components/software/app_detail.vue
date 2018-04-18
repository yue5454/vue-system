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
        <router-link :to="{path: `/solution_edit/${id}`}">
          <el-button type='primary' size="small" icon='el-icon-edit'>edit</el-button>
        </router-link>
        <el-button @click='getInfo()' type='primary' size="small" icon='el-icon-refresh'>refresh</el-button>
      </el-col>
    </el-col>
    <!-- detail -->
    <el-col :span='24'>
      <el-collapse v-model='activeNames'>
        <el-collapse-item title='Basic Infor' name='1'>
          <ul>
            <li v-for="(value, key) in basicInfo" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Permission' name='2'>
          <ul>
            <li v-for="(value, key) in permission" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Firmware' name='3'>
          <ul>
            <li v-for="(value, key) in firmware" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span class='info_det'>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Build History' name='4' v-if='tags && tags.length > 0'>
          <el-button v-for="(value, index) of tags" :key='index' type='default' size='mini'>{{value.name}}</el-button>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import { solutionInfo } from '@/api/api'

  let thisVue = null;
  export default {
    data () {
      return {
        id: '',
        loading: true,
        activeNames: ['1','2','3','4'],
        basicInfo: null,
        permission: null,
        firmware: null,
        tags: null,
        history: null
      }
    },
    methods: {
      getInfo () {
        solutionInfo({id:thisVue.id}).then(json => {
          let {id, image, is_public, link, model, model_id, platform, solution, tags, type, vendor, version} = json.data
          thisVue.basicInfo = {id, image, solution, version, model, type, vendor}
          thisVue.permission = {is_public}
          thisVue.firmware = {link}
          thisVue.tags = tags
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