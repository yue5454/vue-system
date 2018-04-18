<template>
  <el-tabs type='card' @tab-click='handleClick'>
    <el-tab-pane label='Map'>
      <el-row>
        <el-col :span='24' class='margin-10'>
          <router-link to='/dashboard/map_setting'>
            <el-button type='primary' size='small'>Set Style</el-button>
          </router-link>
        </el-col>
        <el-col :span='24'>
          <gmap-map class='map' style='width: 100%;' id='googleMap' :center="center" :options='{styles: appearance}' :zoom='6'>
            <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
              ssssssss
            </gmap-info-window>
            <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" @click="showDetail(m)"
        ></gmap-marker>
          </gmap-map>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label='BMap'>
      <baidu-map class='map' :zoom="zoom" :center="bcenter" @ready="bmapHandler" :scroll-wheel-zoom="true"></baidu-map>
    </el-tab-pane>
    <el-tab-pane label='GaoDe'>
      <el-amap vid="amapDemo" class='map' :zoom="zoom" :center="acenter"></el-amap>
    </el-tab-pane>
    <el-tab-pane label='Charts'>
      <el-row :gutter='10'>
        <el-col :span='8'>
          <el-card class='box-card'>
            <div slot='header' class='clearfix'>
              <span>Area Statistic chart</span>
            </div>
            <div class='card-chart'>
              <div id="statistic" style='width: 360px;height: 300px;'></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span='8'>
          <el-card class='box-card'>
            <div slot='header' class='clearfix'>
              <span>Area Contrast</span>
            </div>
            <div class='card-chart'>
              <div id="contrast" style='width: 360px;height: 300px'></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span='8'>
          <el-card class='box-card'>
            <div slot='header' class='clearfix'>
              <span>Devices Status Number</span>
            </div>
            <div class='card-chart'>
              <div id="deviceNum" style='width: 360px;height: 300px'></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import echarts from 'echarts'
  import { getBarOpt, getPieOpt } from '@/api/echartOption'
  import { styles } from '@/api/mapParams'
  import { mapGetters } from 'vuex'

  let thisVue = null
 
  export default {
    data () {
      return {
        statistic: '',
        contrast: '',
        deviceNum: '',
        appearance: null,
        zoom: 16,
        acenter: [121.5273285, 31.21515044],
        center: {lat: 39.9, lng: 116.3},
        bcenter: {lat: 39.9, lng: 116.3},
        infoWinOpen: false,
        infoPosition: {},
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        markers: [{
          position: {lat: 39.9, lng: 116.3}
        }, {
          position: {lat: 31.23, lng: 121.47}
        }]
      }
    },
    computed: {
      ...mapGetters(['getOption'])
    },
    methods: {
      drawBar () {
        thisVue.statistic = echarts.init(document.getElementById('statistic'));
        thisVue.statistic.setOption(getPieOpt());
      },
      drawLine () {
        thisVue.contrast = echarts.init(document.getElementById('contrast'));
        thisVue.contrast.setOption(getBarOpt())
      },
      drawPie () {
        thisVue.deviceNum = echarts.init(document.getElementById('deviceNum'));
        thisVue.deviceNum.setOption(getPieOpt());
      },
      handleClick (tab, event) {
        // console.log(event)
      },
      showDetail (m) {
        thisVue.infoWinOpen = true
        thisVue.infoPosition = m.position
      },
      bmapHandler ({BMap, map}) {
        console.log(BMap)
      }
    },
    mounted(){
      thisVue = this
      thisVue.appearance = thisVue.getOption
      thisVue.drawPie()
      thisVue.drawBar()
      thisVue.drawLine()
      let mapClass = document.getElementsByClassName("map")
      mapClass[0].style.height = document.body.clientHeight - 200 + "px"
      mapClass[1].style.height = document.body.clientHeight - 200 + "px"
      mapClass[2].style.height = document.body.clientHeight - 200 + "px"
    }
  }

</script>
<style>
  @import '../../assets/style/dashboard.css'
</style>