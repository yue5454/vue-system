<template>
  <el-row :gutter='6'>
    <el-col :span='24' class="color-bar">
      <label>
        <el-button type='text' @click='$router.go(-1)'><i class="iconfont icon-back"></i></el-button>
        <span>Map Setting</span>
      </label>
    </el-col>
    <el-col :span='24' class="color-bar">
      <el-col :span='9'>
        <span class='color-w'>Feature Style：</span>
        <el-select size='small' v-model='addItem.featureType'>
          <el-option v-for='(value, key) in featureOptions' :key='key' :value='value' :label='value'></el-option>
        </el-select>
      </el-col>

      <el-col :span='9'>
        <span class='color-w'>Element Type：</span>
        <el-select size='small' v-model='addItem.elementType'>
          <el-option v-for='(value, key) in elementOptions' :key='key' :value='value' :label='value'></el-option>
        </el-select>
      </el-col>
      
      <el-col :span='4'>
        <span class='color-w'>Element Style：</span>
        <el-color-picker v-model='addItem.stylers[0].color' size='small'></el-color-picker>
      </el-col>
      <el-col :span='2'>
        <div class='color-btn'>
          <el-button size='mini' @click='saveStyle' type="primary">Save</el-button>
        </div>
      </el-col>
    </el-col>
    <el-col :span='24'>
      <el-table size='small' :data='lists' border style='width: 100%;'>
        <el-table-column prop='elementType' label='Element Type'></el-table-column>
        <el-table-column prop='featureType' label='Feature Type'></el-table-column>
        <el-table-column prop='stylers[0].color' label='Styles'></el-table-column>
        <el-table-column label='Action'>
          <template slot-scope='scope'>
            <el-button type='text' class='error' @click='deleteStyle(scope.$index)'><i class='el-icon-delete'></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex' 

  export default {
    data () {
      return {
        addItem: {
          elementType: '',
          featureType: '',
          stylers: [{color: ''}]
        },
        lists: [],
        elementOptions: ['geometry', 'geometry.stroke', 'labels.text.fill', 'labels.text.stroke'],
        featureOptions: ['land', 'water', 'green', 'building', 'highway', 'local', 'railway', 'subway', 'boundary', 'district', 'poi']
      }
    },
    computed: {
      ...mapGetters(['deleteOption', 'getOption', 'addOption'])
    },
    methods: {
      saveStyle () {
        if (this.addItem.elementType !== '' && this.addItem.stylers[0].color !== '') {
          this.lists = this.addOption(this.addItem)
          console.log(this.lists)
        }
      },
      deleteStyle (item) {
        this.lists = this.deleteOption(item)
      }
    },
    mounted () {
      this.lists = this.getOption
      console.log(this.lists)
    }
  }
</script>

<style>
  @import '../../assets/style/dashboard'
</style>