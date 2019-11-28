// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components全局引入-?
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

import utils from './plugins/data.js';
Vue.prototype.$utils = utils;//时间处理

import sock from './plugins/socket.js';
Vue.prototype.$sock = sock;

import moment from 'moment'//导入文件
Vue.prototype.$moment = moment;//赋值使用

import FastClick from 'fastclick';//解决300ms延迟
FastClick.attach(document.body);


moment.locale('zh-cn');//需要汉化

import Vuetify from 'vuetify'
import theme from './plugins/theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


//模态框dialog
import xyDialog from './plugins/xyDialog.js' 
Vue.use(xyDialog)

//按需引入echart的line图
let echarts = require('echarts/lib/echarts');
 require('echarts/lib/chart/line')

 require('echarts/lib/component/title')
 require('echarts/lib/component/legendScroll')//图例滚动
//vue全局注入echarts
 Vue.prototype.$echarts = echarts



Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme
})



// Sync store with router
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  vuetify:new Vuetify(),
  store,
  render: h => h(App)
}).$mount('#app')
