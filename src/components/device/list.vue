<template>
  <div v-loading='loading'>
    <el-row>
      <!-- operation -->
      <el-col :span='24' class='operation-bar'>
        <el-col :span='12'>
          <div class="oper-item">
            <el-select size='small' v-model='tag_name' placeholder='filter by tag'>
              <el-option v-for="(value, key) in tags" :key='key' :value="value.name" :label="value.name"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span='12' class='ope-button'>
          <el-button size='small' type='primary' icon='el-icon-plus' @click='create'>Create</el-button>
          <el-button size='small' type='primary' icon='el-icon-refresh' @click='getList()'>Refresh</el-button>
          <el-dropdown trigger='click' size='mini'>
            <el-button size='small' type='primary'>Operation<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item><div @click="showDialog('tag')">Bind Tags</div></el-dropdown-item>
              <el-dropdown-item><div @click="showDialog('solution')">Deploy Solution</div></el-dropdown-item>
              <el-dropdown-item><div @click="showDialog('app')">Deploy App</div></el-dropdown-item>
              <el-dropdown-item>Delete Device</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
      <!-- table -->
      <el-col :span='24'>
        <el-table size='small' @header-click='getSortList' @selection-change='handleSelectChange' :data='tableList' style='width:100%'>
          <el-table-column type='selection' width='55'></el-table-column>
          <el-table-column label='ID' width='100'>
            <template slot-scope='scope'>
              <router-link :to="{path: `device_detail/${scope.row.id}`}">
                <a type='text' size='small'>#{{scope.row.id}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop='name' label='Name'></el-table-column>
          <el-table-column prop='status' label='Status' width='100'></el-table-column>
          <el-table-column prop='created_at' sortable='false' label='createTime' width='200'></el-table-column>
          <el-table-column label='operations' width='150'>
            <template slot-scope='scope'>
              <el-tooltip class='item' content='Delete' effect='dark' placement="top-start">
                <el-button type='text' class='error' @click.native.prevent='deleteRow(scope.$index, tableList)'>
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' content='Edit' effect='dark' placement="top-start">
                <el-button type='text' @click.native.prevent='editRow(scope.$index, tableList)'>
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- dialog bind tag -->
      <el-dialog width='50%' :visible.sync="tagVisible" title='BindTags'>
        <div>
          <el-select size='small' v-model='selectTag' placeholder='select tag'>
            <el-option v-for="(value, key) in tags" :key='key' :value="value.name" :label="value.name"></el-option>
          </el-select>
        </div>
        <span slot='footer' class='dialog-footer'>
          <el-button size='small' @click="tagVisible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="bindTagtoDevice">确 定</el-button>
        </span>
      </el-dialog>

      <!-- dialog deploy solution -->
      <el-dialog width='50%' :visible.sync="deployVisible" title='Deploy'>
        <div v-if="deploy_type == 'solution'">
          <el-select size='small' v-model='selectSolution' placeholder='select solution'>
            <el-option v-for="(value, key) in solutions" :key='key' :value="key" :label="`${value.solution}-${value.version}-${value.vendor}`"></el-option>
          </el-select>
        </div>
        <div v-if="deploy_type == 'app'">
          <el-select size='small' v-model='selectApp' placeholder='select app'>
            <el-option v-for="(value, key) in apps" :key='key' :value="value.id" :label="`${value.id}-${value.name}-${value.vendor}`"></el-option>
          </el-select>
        </div>
        <span slot='footer' class='dialog-footer'>
          <el-button size='small' @click="deployVisible = false">取 消</el-button>
          <el-button size='small' type="primary" @click="enterDeploy">确 定</el-button>
        </span>
      </el-dialog>

      <!-- pagebar -->
      <el-col :span='24' class='page-bar'>
        <el-pagination background @current-change="handleCurrentChange"  @size-change="handleSizeChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" popper-class='page-pop' layout="total, slot, sizes, prev, pager, next" :total="100">
          <!-- <span class='page-slot'>projects per page</span> -->
        </el-pagination>
      </el-col>

    </el-row>
  </div>
</template>

<script type="text/javascript">
  import { getDeviceList, deleteDevice, bindTags, getTags, deploySolution, getSolutionList, getAppList } from '@/api/api.js'

  let thisVue = null

  export default {
    data () {
      return {
        tableList: [],
        loading: true,
        value: null,
        tagVisible: false,
        deployVisible: false,
        deploy_type: '',
        tags: [],
        solutions: [],
        apps: [],
        selectTag: '',
        selectDev: [],
        selectSolution: null,
        selectApp: null,
        tag_name: ''
      }
    },
    methods: {
      deleteRow (index, value) {
        thisVue.$confirm('are you sure to delete this device?', 'confirm').then(()=>{
          thisVue.delete(value[index].id);
        }).catch(() => {
          return false;
        })
      },
      editRow (index, value) {
        thisVue.$router.push(`/device_edit/${value[index].id}`)
      },
      create () {
        thisVue.$router.push('/device_create');
      },
      showDialog (str) {
        if (thisVue.selectDev.length == 0) {
          thisVue.$message({type: 'warning', message: "please select device"})
        } else {
          if (str === 'tag') {
            thisVue.tagVisible = true
          } else if (str === 'solution') {
            thisVue.deployVisible = true
            thisVue.deploy_type = 'solution'
          } else if (str === 'app') {
            thisVue.deployVisible = true
            thisVue.deploy_type = 'app'
          }
        }
      },
      getList () {
        thisVue.loading = true;
        let params = {offset: 0, limit: 10}
        getDeviceList(params).then(json => {
          thisVue.tableList = json.data.results;
          thisVue.loading = false;
        }, err => {
          console.log(err);
        })
      },
      delete (id) {
        thisVue.loading = true;
        deleteDevice({id: id}).then(json => {
          if (json.data.status == "fail") {
            thisVue.$message({type: 'error', message: json.data.message});
            thisVue.loading = false;
          } else {
            thisVue.getList()
          }
        })
        .catch(err => {
          thisVue.loading = false;
        })
      },
      getTagsList () {
        getTags().then(json => {
          thisVue.tags = json.data
        }).catch(err => {
          return false
        })
      },
      solutionsList () {
        getSolutionList().then(json => {
          thisVue.solutions = json.data.results
        }).catch(err => {
          return false
        })
      },
      appsList () {
        getAppList().then(json => {
          thisVue.apps = json.data.applications
        }).catch(err => {
          return false
        })
      },
      enterDeploy () {
        let [_payload, _type] = [{}, '']
        
        if (thisVue.selectSolution === null && thisVue.selectApp === null) {
          thisVue.$message({type: 'error', message: 'select item to deploy'})
          return false
        }

        if (thisVue.deploy_type === 'solution') {
          let {id: solution_id, solution, model_id, link: url, version} = thisVue.solutions[thisVue.selectSolution]
          _payload = {solution_id, solution, model_id, url, version}
          _type = 'deploy_solution'
        } else if (thisVue.deploy_type === 'app') {
          _payload = {application_id: thisVue.selectApp}
          _type = 'deploy_app'
        }

        let params = {device_ids: thisVue.selectDev, type: _type, payload: _payload}
        deploySolution({task: params}).then(json => {
          if (json.data.status) {
            thisVue.$message({type: 'success', message: json.data.message})
            thisVue.deployVisible = false
          } else {
            thisVue.$message({type: 'error', message: json.data.message})
          }
        }).catch(err => {
          return false
        })
      },
      handleCurrentChange (index) {
        console.log(index)
      },
      handleSizeChange (index) {
        console.log(index)
      },
      getSortList (column, event) {
        if (column.sortable) {
          console.log(11)
        }
      },
      handleSelectChange (val) {
        thisVue.selectDev = []
        for (let item of val) {
          thisVue.selectDev.push(item.id)
        }
      },
      bindTagtoDevice () {
        let params = {device_ids: thisVue.selectDev, tag_name: thisVue.selectTag}
        if (thisVue.selectTag) {
          bindTags(params).then(json => {
            if (json.data.status == "success") {
              thisVue.$message({type: 'success', message: json.data.message})
              thisVue.tagVisible = false
            } else {
              thisVue.$message({type: 'error', message: json.data.message})
            }
          })
        }
      }
    },
    mounted () {
      thisVue = this
      thisVue.getList()
      thisVue.getTagsList()
      thisVue.solutionsList()
      thisVue.appsList()
    }
  }
</script>

<style>
  @import '../../assets/style/list.css'
</style>