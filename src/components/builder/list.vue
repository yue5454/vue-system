<template>
  <div>
    <el-row>
      <!-- operation -->
      <el-col :span='24' class='operation-bar'>
        <el-col :span='18'>
          <el-row :gutter='10'>
            <el-col :span='6'>
              <el-select size='small' v-model='status' placeholder='status' @change='getList'>
                <el-option value='' label='All'></el-option>
                <el-option value='InProgress' label='InProgress'></el-option>
                <el-option value='Succeeded' label='Succeeded'></el-option>
                <el-option value='Failed' label='Failed'></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span='6' class='ope-button'>
          <el-button size='small' type='primary' icon='el-icon-plus' @click='create'>Create</el-button>
          <el-button size='small' type='primary' icon='el-icon-refresh' @click='getList'>Refresh</el-button>
        </el-col>
      </el-col>
      <!-- table -->
      <el-col :span='24'>
        <el-table v-loading='loading' size='small' @header-click='getSortList' :data='tableList' style='width:100%'>
          <el-table-column type='selection' width='55'></el-table-column>
          <el-table-column label='Name'>
            <template slot-scope='scope'>
              <router-link :to="{path: `builder_detail/${scope.row.name}`}">
                <a type='text' size='small'>{{scope.row.name}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label='Status'>
            <template slot-scope='scope'>
              <el-button size='mini' type='success' v-if="scope.row.status == 'Succeeded'">{{scope.row.status}}</el-button>
              <el-button size='mini' type='warning' v-if="scope.row.status == 'InProgress'" :loading='true'>{{scope.row.status}}</el-button>
              <el-button size='mini' type='danger' v-if="scope.row.status == 'Failed'">{{scope.row.status}}</el-button>
              <el-button size='mini' type='info' v-if="scope.row.status == 'Pended'">{{scope.row.status}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop='created' sortable='false' label='CreateTime'></el-table-column>
          <el-table-column prop='updated' sortable='false' label='UpdateTime'></el-table-column>
          <el-table-column label='Actions'>
            <template slot-scope='scope'>
              <el-tooltip :open-delay='delayNum' class='item' content='Start' effect='dark' placement="top-start">
                <el-button type='text' @click.native.prevent='startRow(scope.$index, tableList)'>
                  <i class="iconfont icon-tuichu"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip :open-delay='delayNum' class='item' content='Edit' effect='dark' placement="top-start">
                <el-button type='text' @click.native.prevent='editRow(scope.$index, tableList)'>
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip :open-delay='delayNum' class='item' content='Delete' effect='dark' placement="top-start">
                <el-button type='text' class='error' @click.native.prevent='deleteRow(scope.$index, tableList)'>
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- pagebar -->
      <el-col :span='24' class='page-bar'>
        <el-pagination background @current-change="getList"  @size-change="getList" :current-page="pageBar.page" :page-sizes="[10, 20, 30, 40]" :page-size="pageBar.size" popper-class='page-pop' layout="total, slot, sizes, prev, pager, next" :total="pageBar.total">
          <!-- <span class='page-slot'>projects per page</span> -->
        </el-pagination>
      </el-col>

    </el-row>
  </div>
</template>

<script type="text/javascript">
  import { getBuilderList, deleteBuilder, startBuilder } from '@/api/api.js'

  let thisVue = null

  export default {
    data () {
      return {
        tableList: [],
        delayNum: 600,
        loading: true,
        status: null,
        pageBar: {
          size: 10,
          page: 1,
          reverse: false,
          orderBy: 'updated',
          total: null
        }
      }
    },
    methods: {
      deleteRow (index, value) {
        thisVue.$confirm('are you sure to delete this project?', 'confirm').then(()=>{
          thisVue.delete(value[index].name);
        }).catch(() => {
          return false;
        })
      },
      editRow (index, value) {
        thisVue.$router.push(`/builder_edit/${value[index].name}`)
      },
      startRow (index, value) {
        thisVue.$confirm('are you sure to start this project?', 'confirm').then(()=>{
          let params = {action: 'start', project_id: value[index].name};
          thisVue.loading = true;
          startBuilder(params).then(json => {
            if (json.data.Success) {
              thisVue.getList()
            } else {
              thisVue.loading = false
            }
          }).catch(err => {
            thisVue.loading = false;
            return false;
          })
        }).catch(() => {
          return false;
        })
      },
      create () {
        thisVue.$router.push('/builder_create');
      },
      getList () {
        let {size, page, reverse, orderBy} = thisVue.pageBar
        let params = {size, page, reverse, orderBy}
        params.status = thisVue.status

        thisVue.loading = true

        getBuilderList(params).then(json => {
          if (json.data.projects && json.data.projects.length >= 0) {
            thisVue.tableList = json.data.projects;
            let {size, page, reverse, orderBy, total} = json.data
            thisVue.pageBar = {size, page, reverse, orderBy, total}
          }
          thisVue.loading = false;
        }).catch(err => {
          thisVue.loading = false;
        })
      },
      delete (name) {
        thisVue.loading = true;
        deleteBuilder({project_id: name}).then(json => {
          if (json.data.Success) {
            thisVue.getList();
          } else {
            thisVue.$message({type: 'error', message: json.data.message});
            thisVue.loading = false;
          }
        })
        .catch(err => {
          thisVue.loading = false;
        })
      },
      getSortList (column, event) {
        if (column.order == 'ascending') {
          thisVue.pageBar.reverse = true
        } else {
          thisVue.pageBar.reverse = false
        }
        if (column.label == 'CreateTime') {
          thisVue.pageBar.orderBy = 'created'
        } else if (column.label == 'UpdateTime') {
          thisVue.pageBar.orderBy = 'updated'
        }
        if (typeof column.sortable == 'string') {
          thisVue.getList()
        }
      }
    },
    mounted () {
      thisVue = this
      thisVue.getList();
    }
  }
</script>

<style>
  @import '../../assets/style/list.css'
</style>