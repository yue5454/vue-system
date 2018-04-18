// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import locale from 'element-ui/lib/locale/lang/en'
import store from '@/vuex/store'
import VueCookie from 'vue-cookie'
import * as VueGoogleMap from 'vue2-google-maps'
import AMap from 'vue-amap'
import BMap from 'vue-baidu-map'

Vue.use(VueGoogleMap, {
  load: {
    key: 'AIzaSyC7eyFx2SRyHAXu15tS7AFQgegES04Bnnk',
    v: '3.26',
    libraries: 'visualization',
    language: 'en-us'
  }
})
Vue.use(Element, {locale})
Vue.use(VueCookie)
Vue.use(AMap)
Vue.use(BMap, {
  ak: 'hvAdyXPVsVLqX0PiX7sIadh6ET1CIPy5'
})

AMap.initAMapApiLoader({
  key: '4e2383d1461101e4f5f9e7834844d356',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  let token = VueCookie.get('token');
  if (to.path == '/register') {
    next();
  } else {
    if (!token && to.path != '/login') {
      next({path: '/login'});
    } else {
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
