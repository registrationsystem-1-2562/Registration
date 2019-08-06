import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC1Bq9bLBSFSN_XIpHDIZOpfAXFHsmN9Js",
  authDomain: "register-4ea5e.firebaseapp.com",
  databaseURL: "https://register-4ea5e.firebaseio.com",
  projectId: "register-4ea5e",
  storageBucket: "",
  messagingSenderId: "740307130649",
  appId: "1:740307130649:web:8ee2bb467eb6fd14"
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
