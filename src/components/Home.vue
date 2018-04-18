<template>
  <div style='overflow:hidden;'>
    <el-container>
      <!-- header -->
      <el-header class='header'>
        <el-col :span='12'>
          <div class="logo">
            <img src="../assets/img/download.svg" height='24px' alt="">
            <img src="../assets/img/logo.png" height='30px' alt="">
            <div class="fold-btn" @click='collChange'>
              <!-- <i :class="isCollapse?'iconfont icon-jiantouyou':'iconfont icon-jiantouzuo'" ></i> -->
              <!-- <i class="iconfont icon-openmenu03"></i> -->
            </div>
          </div>
        </el-col>

        <!-- drop-down -->
        <el-col :span='12' class='drop-down'>
          <el-dropdown size='mini' trigger='click' placement='top'>
            <div class="el-dropdown-link">
              <i class='iconfont icon-help' style='font-size: 22px;color: #ffa900;vertical-align: middle;'></i>
              <span>help</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item><el-button type='text'>
                <i class="iconfont icon-wenjian"></i> guide book
              </el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown size='mini' trigger='click' placement='top-end'>
            <div class="el-dropdown-link">
              <img src="../assets/img/user.png" height='30px' alt="">
              <span>{{username}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item><el-button type='text' @click='loginOut'>
                <i class="el-icon-sold-out"></i> Login Out
              </el-button></el-dropdown-item>
              <el-dropdown-item><el-button type='text' @click='loginOut'>
                <i class="iconfont icon-setting"></i> User Setting
              </el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      
      <el-container>
        
        <!-- aside -->
        <el-aside width='auto' class='side-bar'>
          <div class="menu-icon" @click='collChange'><i :class="isCollapse?'iconfont icon-xiangyou':'iconfont icon-xiangzuo'" ></i></div>
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color='#333' text-color='#fff' @open="handleOpen" @close="handleClose" @select="handleselect"
           unique-opened router :collapse='isCollapse'>
            <template v-for='(item,index) in $router.options.routes' v-if='!item.hidden'>
              <el-submenu :index="index+''" v-if='!item.leaf'>
                <template slot='title' class='submenu-tit'>
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for='child in item.children' :key='child.path' :index="child.path" v-if='!child.hidden'>{{child.name}}</el-menu-item>
              </el-submenu>
              
              <el-menu-item :index='item.children[0].path' v-if='item.leaf&&item.children.length>0'>
                <i :class="item.icon"></i>
                <span slot='title'>{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>

        <!-- main -->
        <el-main class='con-main'>
          <div class='main-header'>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item class='bread-item'><i class="iconfont icon-home"></i></el-breadcrumb-item>
              <el-breadcrumb-item class='bread-item' :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item class='bread-item'>{{$route.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main-content">
            <transition mode='out-in'>
              <router-view></router-view>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script type="text/javascript">

  export default {
    data(){
      return {
        isCollapse: false,
        username: this.$cookie.get('username'),
        key: '',
      }
    },
    methods:{
      handleOpen(key, keyPath){
        // console.log(this.$router);
      },
      handleClose(key, keyPath){
        // console.log(key, keyPath);
      },
      handleselect(){
        console.log()
      },
      collChange()
      {
        this.isCollapse = !this.isCollapse;
      },
      loginOut()
      {
        this.$cookie.delete('username');
        this.$cookie.delete('token');
        this.$router.push('/login');
      }
    },
    mounted(){
      let side_bar = document.getElementsByClassName("side-bar")[0];
      let con_main = document.getElementsByClassName("con-main")[0];
      let header = document.getElementsByClassName("header")[0].style.height;
      side_bar.style.height = document.body.clientHeight - parseInt(header) + "px";
      con_main.style.height = document.body.clientHeight - parseInt(header) + "px";
    },
    components: {
    }
  }
</script>

<style scoped>

  .v-enter{opacity: 0;}
  .v-enter-active{transition: 0.5s;}
  .v-enter-to{opacity: 1;}
  .v-leave{opacity: 1;}
  .v-leave-to{opacity:0;}
  .v-leave-active{transition: 0.5s;}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
  }

  .el-menu-vertical-demo{
    border:none;
  }

  .el-menu-item.is-active{color: #4093ff !important;border-right: 5px solid #409eff;}
  .el-submenu .el-menu-item{font-size: 12px !important;}
  .el-menu-item, .el-submenu>:first-child{height: 40px;line-height: 40px;font-size: 13px;}

  .header{line-height:60px;background-color: #262626;}
  .side-bar{overflow: inherit;background-color: #333;border-right: 1px solid #e0e0e0;position: relative;}
  .con-main{overflow-y: inherit;padding: 0px;}
  .main-content{padding: 20px; background-color: #fff;}
  .logo{float:left;width: 280px;}
  .logo img{vertical-align: middle;}
  .fold-btn{color: #8d8daf;margin-left: 40px;vertical-align: middle;cursor: pointer;display: inline-block;height: 60px;}
  .fold-btn .iconfont{font-size: 22px;}
  .el-dropdown-menu__item .el-button--text {font-size: 13px;padding: 5px 0px;}
  .el-dropdown-menu{border-radius: 0px;}

  /*main-header*/
  .main-header{border-bottom: 1px solid #eaebf0;background-color: #fff;padding: 0px 20px;}
  .el-breadcrumb{line-height: 40px;}
  .bread-item>:first-child{font-weight: normal; color: #747576;font-size: 12px;}
  .bread-item>:first-child:hover{color: #409eff;}
  .drop-down{text-align: right;}
  .el-dropdown{font-size: 1rem; color: #8d8daf;cursor: pointer;margin-left: 30px;}
  .el-dropdown-link img{vertical-align: middle;padding-right: 10px;}

  /*icon*/
  .menu-icon{width: 24px;height: 50px;border-radius: 5px;text-align: center;line-height: 50px;position: absolute;top: 50%;right: -12px;margin-top: -20px;background-color: #333;z-index: 2;}
  .menu-icon i{font-size: 20px;color: #fff;}
</style>