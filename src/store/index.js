import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    newUser: null, 
    existedUser: null, 
    snackBar: false, 
    message: '', 
    logUser: false
  },
  getters: {
    users: (state)=>{
      return state;
    }
  },
  mutations: {
    ADD_USER: (state, payload)=>{
      console.log('error '+payload.data.error ,payload.data.message);
      state.newUser= payload
      if(payload.data.error===0){
        state.message='Signup completed'
        state.snackBar=true;
      }
      else{
        state.message=payload.data.message;
        state.snackBar=true;
      }
    },
    LOGIN: (state, payload)=>{
      console.log('error '+payload.resp.data.error ,payload.resp.data.token);
      state.existedUser=payload.resp;
      if(payload.resp.data.error===0){
        let decode = VueJwtDecode.decode(payload.resp.data.token);
        console.log(decode);
        payload.router.push({path: '/dashBoard', component: payload.component});
        state.message='login successfully';
        state.snackBar=true;
      }
      else{
        state.message= 'password or email do not match enter again';
        state.snackBar=true;
      }
    }
  },
  actions: {
    addUser: (context, payload)=>{
      console.log(payload.loginDetails.userName, payload.loginDetails.role, payload.loginDetails.password);
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}&role=${payload.loginDetails.role}`).then((resp)=>{
        context.commit('ADD_USER', resp);
      })
    },
    login: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}`).then((resp)=>{
        context.commit('LOGIN', {resp: resp, router: payload.router});
      })
    }
  },
  modules: {
  }
})
