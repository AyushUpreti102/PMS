import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    show: true,
    newUser: null, 
    existedUser: null, 
    snackBar: false, 
    message: '', 
    logUser: false,
    poll: [],
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
    ADD_POLL: (state, payload)=>{
      let data = JSON.parse(payload)
      state.poll.push(data.data);
      console.log(data.data);
    },
    LOGIN: (state, payload)=>{
      console.log(payload.resp);
      state.existedUser=payload.resp;
      if(state.existedUser.error===0){
        let decode = VueJwtDecode.decode(payload.resp.token);
        console.log(decode);
        state.show=false;
        payload.router.push({path: '/dashBoard', component: payload.component});
        state.message='login successfully';
        state.snackBar=true;
      }
      else{
        state.message= 'password or email do not match enter again';
        state.snackBar=true;
        state.show=true;
      }
    },
    LOGOUT: (state, payload)=>{
      state;
      payload.router.push({path: '/', component: payload.component});
      state.message='logged out successfully';
      state.snackBar=true;
    },
    LIST_POLLS: (state, payload)=>{
      state.poll= payload.data.data;
      console.log(payload.data.data[0]);
    },
    VOTE:(state, payload)=>{
      state;
      console.log(JSON.parse(payload));
    }
  },
  actions: {
    addUser: (context, payload)=>{
      console.log(payload.loginDetails.userName, payload.loginDetails.role, payload.loginDetails.password);
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}&role=${payload.loginDetails.role}`).then((resp)=>{
        context.commit('ADD_USER', resp);
      })
    },
    addPoll: (context)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3`).then((resp)=>{
        context.commit('ADD_POLL', JSON.stringify(resp.data));
      })
    },
    login: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}`).then((resp)=>{
        context.commit('LOGIN', {resp: resp.data, router: payload.router});
      })
    },
    logout: (context, payload)=>{
      context.commit('LOGOUT', payload);
    },
    listPolls: (context)=>{
      axios.get('https://secure-refuge-14993.herokuapp.com/list_polls').then((resp)=>{
        context.commit('LIST_POLLS', resp);
      })
    },
    vote: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/do_vote?id=577212fdd1bba33c17b5b64e&option_text=${payload}`).then((resp)=>{
        context.commit('VOTE', JSON.stringify(resp));
      })
    }
  },
  modules: {
  }
})
