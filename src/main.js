import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n'
import messages from './assets/messages'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);




import store from './store/store'
import router from '@/router/router'




// if(process.env.VUE_API_VARIABLE){
//     axios.defaults.baseURL = 'http://192.168.1.67:8090/ap/v1'
// }
// else{
//     axios.defaults.baseURL = '/ap/v1'
// }



// Локально
axios.defaults.baseURL='http://localhost:8090/ap/v1';


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
