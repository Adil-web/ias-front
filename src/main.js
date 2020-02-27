import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';

// import Vuex from 'vuex'


import store from './store/store'
import router from '@/router/router'




// Vue.use(Vuex)

axios.defaults.baseURL='http://localhost:8090';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
