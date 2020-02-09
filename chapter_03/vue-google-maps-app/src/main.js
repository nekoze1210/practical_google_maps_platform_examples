import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.API_KEY,
    libraries: 'places,geometry,visualization' // カンマ区切りの文字列で libraries を指定する
  },
  installComponents: true
})

new Vue({
  render: h => h(App),
}).$mount('#app')
