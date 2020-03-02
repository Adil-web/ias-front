import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n'
import messages from './assets/messages'




import store from './store/store'
import router from '@/router/router'





axios.defaults.baseURL='http://localhost:8090';
Vue.config.productionTip = false;
Vue.use(VueI18n);

let defLocale = sessionStorage.getItem('ias-locale');
const i18n = new VueI18n({
  locale: defLocale || 'ru',
  messages,
  silentTranslationWarn: true
});


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
