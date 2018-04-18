<template>
  <div>
    <el-row>
      <!-- operation -->
      <el-col :span='24' class='operation-bar'>
        <el-col :span='18'>
          <el-row :gutter='10'>
            <el-col :span='4'>
              <el-select size='small' v-model='value' placeholder='status'>
                <el-option value='111'>111</el-option>
                <el-option value='222'>222</el-option>
                <el-option value='333'>333</el-option>
              </el-select>
            </el-col>
            <el-col :span='4'>
              <el-select size='small' v-model='value' placeholder='status'>
                <el-option value='444'>444</el-option>
                <el-option value='555'>555</el-option>
                <el-option value='666'>666</el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span='6' class='ope-button'>
          <el-button size='small' type='danger' icon='el-icon-delete' @click='deleteAll'>Delete</el-button>
          <el-button size='small' type='primary' icon='el-icon-refresh' @click='getList()'>Refresh</el-button>
        </el-col>
      </el-col>
      <!-- table -->
      <el-col :span='24'>
        <el-table v-loading='loading' size='small' @selection-change="getSelectDev" @header-click='getSortList' :data='tableList' style='width:100%'>
          <el-table-column type='selection' width='55'></el-table-column>
          <el-table-column label='ID'>
            <template slot-scope='scope'>
              <router-link :to="{path: `task_detail/${scope.row.id}`}">
                <a type='text' size='small'>#{{scope.row.id}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop='type' label='Type'></el-table-column>
          <el-table-column prop='create_time' sortable='false' label='createTime'></el-table-column>
          <el-table-column prop='status' label='Status'></el-table-column>
          <el-table-column label='operations'>
            <template slot-scope='scope'>
              <el-tooltip class='item' content='Delete' effect='dark' placement="top-start">
                <el-button type='text' class='error' @click.native.prevent='deleteRow(scope.row.id)'>
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <!-- <el-tooltip class='item' content='Edit' effect='dark' placement="top-start">
                <el-button type='text' @click.native.prevent='editRow(scope.$index, tableList)'>
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>

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
  import { getTaskList,deleteTask } from '@/api/api.js'

  let thisVue = null

  export default {
    data () {
      return {
        tableList: [],
        loading: true,
        value: null,
        selectDev: []
      }
    },
    methods: {
      deleteRow (value) {
        thisVue.$confirm('are you sure to delete this model?', 'confirm').then(()=>{
          thisVue.delete([value]);
        }).catch(() => {
          return false;
        })
      },
      editRow (index, value) {
        thisVue.$router.push(`/model_edit/${value[index].id}`)
      },
      deleteAll () {
        thisVue.$confirm('are you sure to delete selected tasks?', 'delete', {type: 'warning'}).then(() => {
        	thisVue.delete(thisVue.selectDev)
        }).catch(err => {
        	return false
        })
      },
      getList () {
        thisVue.loading = true;
        getTaskList().then(json => {
          thisVue.tableList = json.data.items;
          thisVue.loading = false;
        }, err => {
          console.log(err);
        })
      },
      delete (id) {
        thisVue.loading = true;
        deleteTask({task_ids: id.join(",")}).then(json => {
          if (json.data.status == "success") {
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
      getSelectDev (selection) {
      	thisVue.selectDev = []
      	for (let item of selection) {
      		thisVue.selectDev.push(item.id)
      	}
      },
      handleCurrentChange (index) {
        console.log(index)
      },
      handleSizeChange (index) {
        console.log(index)
      },
      getSortList (column, event) {
        console.log(11)
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