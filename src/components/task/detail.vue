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
        <router-link :to="{path: `/task_edit/${id}`}">
          <!-- <el-button type='primary' size="small" icon='el-icon-edit'>edit</el-button> -->
        </router-link>
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
        <el-collapse-item title='Source Code' name='2'>
          <ul>
            <li v-for="(value, key) in payloadInfo" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Deploy Device' name='3'>
          <el-table size='small' :data='result' style='width:100%'>
            <el-table-column prop='device_id' label='Id' width='300px'></el-table-column>
            <el-table-column prop='device_name' label='Name'></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import { taskInfo } from '@/api/api'

  let thisVue = null;
  export default {
    data () {
      return {
        id: '',
        loading: true,
        activeNames: ['1','2','3'],
        basicInfo: null,
        payloadInfo: null,
        result: null
      }
    },
    methods: {
      getInfo () {
        taskInfo({id:thisVue.id}).then(json => {
          let {type, status, create_time} = json.data
          thisVue.basicInfo = {type, status, create_time}
          thisVue.payloadInfo = json.data.payload
          thisVue.result = json.data.status_payload
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