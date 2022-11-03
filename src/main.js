import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/index'
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next)=>{
  let logUser = JSON.parse(localStorage.getItem('logUser'));
  if (logUser!==true && (to.path==='/dashBoard' || to.path==='/Profile' || to.path==='/List')) {
    next('/')
  }
  else if (logUser===true && (to.path==='/Login' || to.path==='/Signup')) {
    if (from.path==='/dashBoard') {
      next('/')
    }
    if(from.path==='/'){
      next('/dashBoard')
    }
  }
  else{
    next();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
