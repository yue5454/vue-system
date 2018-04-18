<template>
  <el-row v-loading='loading'>
    <!-- operate bar -->
    <el-col :span='24' class="operation-bar">
      <el-col :span='12' class='det_tit'>
        <label>
          <el-button type='text' @click='$router.go(-1)'><i class="iconfont icon-back"></i></el-button>
          <span>{{project_id}}</span>
        </label>
      </el-col>
      <el-col :span='12' class="ope-button">
        <router-link :to="{path: `/builder_edit/${project_id}`}">
          <el-button type='primary' size="small" icon='el-icon-edit'>edit</el-button>
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
            <li v-for="(value, key) in sourceCode" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Build Environment' name='3'>
          <ul>
            <li v-for="(value, key) in environment" :key='key'>
              <label>
                <!-- <i class='iconfont icon-unselected'></i> -->
                <span class='info_tit'>{{key}}</span>
                <span>{{value}}</span>
              </label>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title='Build History' name='4'>
          <el-table size='small' :data='history' style='width:100%'>
            <el-table-column label='Id' prop='id' width='300px'></el-table-column>
            <el-table-column label='Status'>
              <template slot-scope='scope'>
                <el-button size='mini' type='success' v-if="scope.row.status == 'Succeeded'">{{scope.row.status}}</el-button>
                <el-button size='mini' type='warning' v-if="scope.row.status == 'InProgress'" :loading='true'>{{scope.row.status}}</el-button>
                <el-button size='mini' type='danger' v-if="scope.row.status == 'Failed'">{{scope.row.status}}</el-button>
                <el-button size='mini' type='info' v-if="scope.row.status == 'Pended'">{{scope.row.status}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop='startTime' label='CreateTime'></el-table-column>
            <el-table-column prop='lastUpdateTime' label='UpdateTime'></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import { builderInfo } from '@/api/api'

  let thisVue = null;
  export default {
    data () {
      return {
        project_id: '',
        loading: true,
        activeNames: ['1','2','3','4'],
        basicInfo: null,
        sourceCode: null,
        environment: null,
        history: null
      }
    },
    methods: {
      getInfo () {
        builderInfo({project_id:thisVue.project_id}).then(json => {
          let {computeType, description, image, name, pollForSourceChanges, sourceParam1, sourceParam2, sourceProvider, timeoutInMinutes, builds} = json.data
          thisVue.history = builds
          thisVue.basicInfo = {name, description}
          if (sourceProvider === 'S3') {
              thisVue.sourceCode = {sourceProvider, 's3-Object-Key': sourceParam1, 'isSourceChange': pollForSourceChanges}
            } else {
              thisVue.sourceCode = {sourceProvider, 'repository': sourceParam1, 'branch': sourceParam2, 'isSourceChange': pollForSourceChanges}
            }
          thisVue.environment = {image, computeType, timeoutInMinutes}
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      }
    },
    mounted () {
      thisVue = this
      thisVue.project_id = thisVue.$route.params.id
      thisVue.getInfo()
    }
  }
</script>
<style>
  @import '../../assets/style/detail.css'
</style>