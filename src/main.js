import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB3eOcFQvZC85B_OdyDIXY3gytdOrhOICE",
  authDomain: "cpe-projectregbot-bumgbp.firebaseapp.com",
  databaseURL: "https://cpe-projectregbot-bumgbp.firebaseio.com",
  projectId: "cpe-projectregbot-bumgbp",
  storageBucket: "cpe-projectregbot-bumgbp.appspot.com",
  messagingSenderId: "619014354888",
  appId: "1:619014354888:web:de3335e734b5ab83"
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
