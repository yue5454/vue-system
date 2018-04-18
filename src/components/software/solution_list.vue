<template>
  <div>
    <el-row>
      <!-- operation -->
      <el-col :span='24' class='operation-bar'>
        <el-col :span='18'>
          <el-row :gutter='10'>
            <el-col :span='6'>
              <el-input size='small' placeholder='search'>
                <el-button slot='append' icon='el-icon-search'></el-button>
              </el-input>
            </el-col>
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
            <el-col :span='4'>
              <el-select size='small' v-model='value' placeholder='status'>
                <el-option value='777'>777</el-option>
                <el-option value='999'>999</el-option>
                <el-option value='888'>888</el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span='6' class='ope-button'>
          <el-button size='small' type='primary' icon='el-icon-plus' @click='create'>Create</el-button>
          <el-button size='small' type='primary' icon='el-icon-refresh' @click='getList()'>Refresh</el-button>
        </el-col>
      </el-col>
      <!-- table -->
      <el-col :span='24'>
        <el-table v-loading='loading' size='small' @header-click='getSortList' :data='tableList' style='width:100%'>
          <el-table-column type='selection' width='55'></el-table-column>
          <el-table-column label='Solution'>
            <template slot-scope='scope'>
              <router-link :to="{path: `solution_detail/${scope.row.id}`}">
                <a type='text' size='small'>{{scope.row.solution}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop='model' label='Model'></el-table-column>
          <el-table-column prop='platform' sortable='false' label='Platform'></el-table-column>
          <el-table-column prop='vendor' label='Vendor' width='100'></el-table-column>
          <el-table-column prop='image' label='Image' width='300'></el-table-column>
          <el-table-column label='operations'>
            <template slot-scope='scope'>
              <el-tooltip :open-delay='delayNum' class='item' content='Delete' effect='dark' placement="top-start">
                <el-button type='text' class='error' @click.native.prevent='deleteRow(scope.$index, tableList)'>
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip :open-delay='delayNum' class='item' content='Edit' effect='dark' placement="top-start">
                <el-button type='text' @click.native.prevent='editRow(scope.$index, tableList)'>
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip :open-delay='delayNum' class='item' content='downLoad' effect='dark' placement="top-start">
                <el-button type='text'><a :href='scope.row.link'><i class="el-icon-download"></i></a></el-button>
              </el-tooltip>
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
  import { getSolutionList,deleteSolution } from '@/api/api.js'

  let thisVue = null

  export default {
    data () {
      return {
        tableList: [],
        delayNum: 600,
        loading: true,
        value: null
      }
    },
    methods: {
      deleteRow (index, value) {
        thisVue.$confirm('are you sure to delete this solution?', 'confirm').then(()=>{
          thisVue.delete([value[index].id]);
        }).catch(() => {
          return false;
        })
      },
      editRow (index, value) {
        thisVue.$router.push(`/solution_edit/${value[index].id}`)
      },
      create () {
        thisVue.$router.push('/solution_create');
      },
      getList () {
        thisVue.loading = true;
        getSolutionList().then(json => {
          thisVue.tableList = json.data.results;
          thisVue.loading = false;
        }, err => {
          console.log(err);
        })
      },
      delete (id) {
        thisVue.loading = true;
        deleteSolution({id: id}).then(json => {
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