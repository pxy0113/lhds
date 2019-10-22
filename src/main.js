// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
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

moment.locale('zh-cn');//需要汉化

import Vuetify from 'vuetify'
import theme from './plugins/theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

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
