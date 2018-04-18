import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import ModelList from '@/components/model/list'
import ModelCreate from '@/components/model/create'
import ModelDetail from '@/components/model/detail'
import ModelEdit from '@/components/model/edit'
import DashBoard from '@/components/dashboard/dashboard'
import SetMap from '@/components/dashboard/set_map'

import DeviceList from '@/components/device/list'
import DeviceCreate from '@/components/device/create'
import DeviceDetail from '@/components/device/detail'

import SolutionList from '@/components/software/solution_list'
import SolutionCreate from '@/components/software/solution_create'
import SolutionDetail from '@/components/software/solution_detail'
import SolutionEdit from '@/components/software/solution_edit'
import AppList from '@/components/software/app_list'
import AppCreate from '@/components/software/app_create'
import AppDetail from '@/components/software/app_detail'

import TaskList from '@/components/task/list'
import TaskDetail from '@/components/task/detail'

import Login from '@/components/admin/login'
import Register from '@/components/admin/register'

// builder
import BuilderList from '@/components/builder/list'
import BuilderCreate from '@/components/builder/create'
import BuilderEdit from '@/components/builder/edit'
import BuilderDetail from '@/components/builder/detail'

// user
import ManageUserList from '@/components/manage/user/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      hidden: true
    },
    {
      path: '/',
      name: '',
      component: Home,
      icon: 'el-icon-date',
      leaf:true,
      children: [
        {path:'/dashboard',name:'Dashboard',component:DashBoard},
        {path:'/dashboard/map_setting',name:'Mapsetting',component:SetMap, hidden: true},
        {path:'',name:'Dashboard',component:DashBoard, hidden: true},
      ]
    },
    {
      path: '/',
      name: 'Model',
      component: Home,
      icon: 'el-icon-news',
      children: [
        {path:'/model_list',name:'Model List',component:ModelList},
        {path:'/model_create',name:'Model Create',component:ModelCreate, hidden: true},
        {path:'/model_detail/:id',name:'Model Detial',component:ModelDetail, hidden: true},
        {path:'/model_edit/:id',name:'Model Edit',component:ModelEdit, hidden: true},
      ]
    },
    {
      path: '/',
      name: 'Device',
      component: Home,
      icon: 'el-icon-service',
      children: [
        {path:'/device_list',name:'Device List',component:DeviceList},
        {path:'/device_create',name:'Device Create',component:DeviceCreate, hidden: true},
        {path:'/device_detail/:id',name:'Device Detail',component:DeviceDetail, hidden: true},
      ]
    },
    {
      path: '/',
      name: 'SoftWare',
      component: Home,
      icon: 'el-icon-printer',
      children: [
        {path:'/solution_list',name:'Solution List',component:SolutionList},
        {path:'/solution_create',name:'Solution Create',component:SolutionCreate, hidden: true},
        {path:'/solution_detail/:id',name:'Solution Detail',component:SolutionDetail, hidden: true},
        {path:'/solution_edit/:id',name:'Solution Edit',component:SolutionEdit, hidden: true},
        {path:'/app_list',name:'App',component:AppList},
        {path:'/app_create',name:'App Create',component:AppCreate, hidden: true},
        {path:'/app_detail/:id',name:'App Detail',component:AppDetail, hidden: true}
      ]
    },
    {
      path: '/',
      name: 'Task',
      component: Home,
      icon: 'el-icon-date',
      children: [
        {path: '/task_list', name: 'Task List', component: TaskList},
        {path: '/task_detail/:id', name: 'Task Detail', component: TaskDetail, hidden: true}
      ]
    },
    {
      path: '/',
      name: 'Builder',
      component: Home,
      icon: 'el-icon-mobile-phone',
      children: [
        {path:'/builder_list',name:'Builder List',component:BuilderList},
        {path:'/builder_create',name:'Builder Create',component:BuilderCreate, hidden: true},
        {path:'/builder_edit/:id',name:'Builder Edit',component:BuilderEdit, hidden: true},
        {path:'/builder_detail/:id',name:'Builder Detail',component:BuilderDetail, hidden: true},
      ]
    },
    {
      path: '/',
      name: 'Manage',
      component: Home,
      icon: 'el-icon-setting',
      children: [
        {path:'/user_list',name:'User List',component:ManageUserList}
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/dashboard'}
    },
  ]
})
