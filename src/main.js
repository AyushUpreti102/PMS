import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueRouter from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import SignUp from './components/SignUp.vue'
import HomePage from './components/HomePage.vue'
Vue.use(VueRouter);

const routes = [
    {path: '/', component: HomePage},
    {path: '/Signup', component: SignUp},
    {path: '/LoginPage', component: LoginPage}
]
const router = new VueRouter({routes});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
