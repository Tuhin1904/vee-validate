import Vue from 'vue'
import App from './App.vue'
import { ValidationObserver,ValidationProvider,extend,
  localize } from 'vee-validate'
import en from "vee-validate/dist/locale/en.json"
import * as rules from "vee-validate/dist/rules";
import { BootstrapVue,BootstrapVueIcons  } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueRouter from 'vue-router';
import Home from './components/Home'
import VeeValidateForm from './components/VeeValidateForm'
import APICall from './components/APICall'
import VueAxios from "vue-axios";
import axios from 'axios'


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("en", en);
localize('en', {
  messages: {
    required: (field) => `The ${field} is required`,
  },
});

const routes=[
  {path:'/',component:Home},
  {path:'/form',component:VeeValidateForm},
  {path:'/APICall', component:APICall}
]

const router=new VueRouter({
  routes
})
Vue.prototype.$axios = axios;

Vue.use(VueAxios,axios)
Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
