<template>
  <el-row :gutter='6'>
    <el-col :span='24' class="operation-bar">
      <el-col :span='12' class='det_tit'>
        <label>
          <el-button type='text' @click='$router.go(-1)'><i class="iconfont icon-back"></i></el-button>
          <span>Map Setting</span>
        </label>
      </el-col>
      <el-col :span='12' class="ope-button">
        <el-button type='primary' size="small" @click='saveStyle'><i class="iconfont icon-save"></i> Save</el-button>
      </el-col>
    </el-col>
    <el-col :span='8' v-for='(value, key) in options' :key='key'>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{value.name}}</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text" icon='el-icon-circle-close-outline'></el-button> -->
        </div>
        <div class="color-block">
          <div class='color-sel color-w'><span>geometry fill：</span></div>
          <div class="color-sel"><el-color-picker v-model='value.fill' size='small'></el-color-picker></div>
          <div class='color-sel'><el-input readonly type="text" size='small' v-model='value.fill'></el-input></div>
        </div>
        <div class="color-block">
          <div class='color-sel color-w'><span>geometry stroke：</span></div>
          <div class="color-sel"><el-color-picker v-model='value.stroke' size='small'></el-color-picker></div>
          <div class='color-sel'><el-input readonly type="text" size='small' v-model='value.stroke'></el-input></div>
        </div>
        <div class="color-block">
          <div class='color-sel color-w'><span>text fill：</span></div>
          <div class="color-sel"><el-color-picker v-model='value.text_fill' size='small'></el-color-picker></div>
          <div class='color-sel'><el-input readonly type="text" size='small' v-model='value.text_fill'></el-input></div>
        </div>
        <div class="color-block">
          <div class='color-sel color-w'><span>text stroke：</span></div>
          <div class="color-sel"><el-color-picker v-model='value.text_stroke' size='small'></el-color-picker></div>
          <div class='color-sel'><el-input readonly type="text" size='small' v-model='value.text_stroke'></el-input></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState } from 'vuex' 

  export default {
    data () {
      return {
        style: [],
        options: [
          { name: 'Land Style', type: 'land', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Water Style', type: 'water', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Green Style', type: 'green', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Building Style', type: 'building', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Highway Style', type: 'highway', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Local Style', type: 'local', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Railway Style', type: 'railway', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Subway Style', type: 'subway', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Boundary Style', type: 'boundary', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'District Style', type: 'district', fill: '', stroke: '', text_fill: '', text_stroke: '' },
          { name: 'Poilabel Style', type: 'poi', fill: '', stroke: '', text_fill: '', text_stroke: '' },
        ],
        activeName: ['1']
      }
    },
    computed: {
      ...mapState(['optionsList'])
    },
    methods: {
      saveStyle () {
        console.log(this.style)
      }
    },
    mounted () {
      this.style = this.optionsList
    }
  }
</script>

<style>
  @import '../../assets/style/dashboard'
</style>