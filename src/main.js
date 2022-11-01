import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/index'
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next)=>{
  if (store.getters.logUser && (to.path==='/Login' || to.path==='/Signup')) {
    if(from.path==='/dashBoard'){
      next('/');
    }
    if(from.path==='/'){
      next('/dashBoard');
    }
    console.log(from);
  }
  else if (!store.getters.logUser && (to.path==='/dashBoard')) {
    next('/Login')
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
