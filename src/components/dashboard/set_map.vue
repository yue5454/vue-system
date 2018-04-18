<template>
  <el-row :gutter='6'>
    <el-col :span='24' class="color-bar">
      <el-col :span='12'>
        <label>
          <el-button type='text' @click='$router.go(-1)'><i class="iconfont icon-back"></i></el-button>
          <span>Map Setting</span>
        </label>
      </el-col>
      <el-col :span='12' class='color-btn'>
        <el-button size='mini' @click='saveStyle' type="primary">Save</el-button>
      </el-col>
    </el-col>
    <!-- <el-col :span='24' class="color-bar">
      <el-col :span='7'>
        <span class='color-w'>Feature Style：</span>
        <el-select size='small' v-model='addItem.featureType'>
          <el-option-group v-for='(value, key) in getFeatures' :key='key' :label='key'>
            <el-option v-for='(item, index) in value' :key='index' :value='item' :label='item'></el-option>
          </el-option-group>
        </el-select>
      </el-col>

      <el-col :span='7'>
        <span class='color-w'>Element Type：</span>
        <el-select size='small' v-model='addItem.elementType'>
          <el-option-group v-for='(value, key) in getElements' :key='key' :label='key'>
            <el-option v-for='(item, index) in value' :key='index' :value='item' :label='item'></el-option>
          </el-option-group>
        </el-select>
      </el-col>

      <el-col :span='7'>
        <span class='color-w'>Visibility：</span>
        <el-select size='small' v-model='addItem.stylers[1].visibility'>
          <el-option value='simplified' label='simplified'></el-option>
          <el-option value='on' label='on'></el-option>
          <el-option value='off' label='off'></el-option>
        </el-select>
      </el-col>
      
      <el-col :span='2'>
        <span class='color-w'>Colors：</span>
        <el-color-picker v-model='addItem.stylers[0].color' size='small'></el-color-picker>
      </el-col>
      <el-col :span='1'>
        <div class='color-btn'>
          <el-button size='mini' @click='addStyle' type="primary"><i class="el-icon-plus"></i></el-button>
        </div>
      </el-col>
    </el-col> -->
    <el-col :span='24'>
      <el-table size='small' :data='lists' border style='width: 100%;'>
        <el-table-column prop='featureType' label='Feature Type'></el-table-column>
        <el-table-column prop='elementType' label='Element Type'></el-table-column>
        <el-table-column label='Styles'>
          <template slot-scope='scope'>
            <el-color-picker size='mini' :ref='scope.$index+1' v-model="scope.row.stylers[0].color"></el-color-picker>
            <span v-text='scope.row.stylers[0].color'></span>
          </template>
        </el-table-column>
        <!-- <el-table-column label='Action'>
          <template slot-scope='scope'>
            <el-button type='text' class='error' @click='deleteStyle(scope.$index)' v-if="scope.$index > 2"><i class='el-icon-delete'></i></el-button>
            <el-button type='text' class='table-btn' @click='editStyle(scope.$index + 1)'><i class='el-icon-edit'></i></el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex' 

  export default {
    data () {
      return {
        addItem: {
          elementType: '',
          featureType: '',
          stylers: [{color: ''},{visibility: ''}]
        },
        lists: []
      }
    },
    computed: {
      ...mapGetters(['deleteOption', 'getOption', 'addOption', 'getFeatures', 'getElements'])
    },
    methods: {
      ...mapActions(['getOptions']),
      ...mapMutations(['GET_OPTIONSLIST']),
      addStyle () {
        if (this.addItem.elementType !== '' && this.addItem.stylers[0].color !== '') {
          this.lists = this.addOption(this.addItem)
          console.log(this.lists)
        }
      },
      saveStyle () {
        console.log(11)
      },
      deleteStyle (item) {
        this.lists = this.deleteOption(item)
      }
    },
    mounted () {
      this.lists = this.getOption
      // this.getOptions().then(data => {
      //   console.log(data)
      // })
    }
  }
</script>

<style>
  @import '../../assets/style/dashboard'
</style>