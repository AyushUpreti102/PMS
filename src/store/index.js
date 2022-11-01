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
    poll: [],
    start: 0,
    end: 31,
  },
  getters: {
    poll: (state)=>{
      return state.poll;
    },
    snackBar: (state)=>{
      state.snackBar
    },
    message: (state)=>{
      return state.message
    },
    logUser: (state)=>{
      return state.logUser
    },
    show:(state)=>{
      return state.show
    }
  },
  mutations: {
    LOGIN: (state, payload)=>{
      console.log(payload.resp);
      state.existedUser=payload.resp;
      if(state.existedUser.error===0){
        let decode = VueJwtDecode.decode(payload.resp.token);
        localStorage.setItem('user', decode.role);
        localStorage.setItem('show', true)
        localStorage.setItem('logUser', true)
        let role = localStorage.getItem('user');
        if(role==='admin'){
          state.show=true;
          console.log(state.show);
        }
        else{
          localStorage.setItem('show', false);
          console.log(state.show);
        }
        payload.router.push({path: '/dashBoard', component: payload.component});
        state.message='login successfully';
        state.snackBar=true;
      }
      else{
        state.message= 'password or email do not match enter again';
        state.snackBar=true;
      }
    },
    ADD_USER: (state, payload)=>{
      console.log(payload.resp.error);
      state.newUser= payload.resp
      if(payload.resp.error===0){
        payload.router.push({path: '/Login', component: payload.component})
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
      state.poll.push({id: data.data.id, title: data.data.title, options: data.data.options, radioGroup: null});
      console.log(data.data);
    },
    LOGOUT: (state, payload)=>{
      console.log(payload);
      state.message='logged out successfully';
      state.snackBar=true;
      localStorage.clear();
      payload.router.push({path: '/Login', component: payload.component});
    },
    LIST_POLLS: (state, payload)=>{
      state.poll= payload.data.data.slice(state.start, state.end);
      console.log(payload.data.data);
    },
    VOTE:(state, payload)=>{
      let resp =JSON.parse(payload);
      state.poll;
      console.log(resp);
    },
    VALIDATE(state, payload){
      state.message=payload
      state.snackBar=true;
    },
    DELETE_POLL: (state, payload)=>{
      const resp = JSON.parse(payload);
      if (resp.error===0) {
        state.poll.splice(resp.index, 1);
        state.message='Poll deleted successfully'
        state.snackBar=true;
      } else {
        state.snackBar=true;
        state.message='! invalid poll'
      }
    },  
    DELETE_OPTION: (state, payload)=>{
      let resp = JSON.parse(payload.data);
      if (resp.error===0) {
        console.log(resp, payload.pollIndex, payload.optionIndex);
        state.poll[payload.pollIndex].options.splice(payload.optionIndex, 1);
      }
    },
    ADD_NEW_OPTIONS_TO_POLL: (state, payload)=>{
      let resp = JSON.parse(payload.data);
      if(resp.error===0){
        console.log(resp, payload.pollIndex, payload.option);
        state.poll[payload.pollIndex].options.push({option: payload.option, vote: 0})
      }
    },
    PAGINATION: (state, payload)=>{
      state.start=payload.start;
      state.end=payload.end;
    }
  },
  actions: {
    login: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}`).then((resp)=>{
        context.commit('LOGIN', {resp: resp.data, router: payload.router});
      })
    },
    addUser: (context, payload)=>{
      let details = JSON.parse(payload.details);
      console.log(details.userName, details.role, details.password);
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${details.userName}&password=${details.password}&role=${details.role}`).then((resp)=>{
        context.commit('ADD_USER', {resp: resp.data, router: payload.router, component: payload.component});
      })
    },
    addPoll: (context, payload)=>{
      let poll = JSON.parse(payload)
      let option = "";
      for(let i = 0; i < poll.options.length-1; i++) {
        option = option.concat(poll.options[i].option, "____")
      }
      option = option.concat(poll.options[poll.options.length -1].option);
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${poll.title}&options=${option}`).then((resp)=>{
        context.commit('ADD_POLL', JSON.stringify(resp.data));
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
      axios.get(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.id}&option_text=${payload.radioGroup}`).then((resp)=>{
        context.commit('VOTE', JSON.stringify(resp));
      }).catch((err)=>{
        console.log(err);
      })
    },
    validate: (context, payload)=>{
      context.commit('VALIDATE', payload);
    },
    deletePoll: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload.id}`).then((resp)=>{
        context.commit('DELETE_POLL', JSON.stringify({error: resp.data.error, index: payload.idx}));
      })
    },
    deleteOption: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.id}&option_text=${payload.option}`).then((resp)=>{
        context.commit('DELETE_OPTION', {data: JSON.stringify(resp.data), pollIndex: payload.pollIndex, optionIndex: payload.optionIndex});
      })
    },
    addNewOptionsToPoll: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${payload.option}`).then((resp)=>{
        context.commit('ADD_NEW_OPTIONS_TO_POLL', {data: JSON.stringify(resp.data), pollIndex: payload.pollIndex, option: payload.option});
      })
    },
    pagination: (context, payload)=>{
      context.commit('PAGINATION', payload);
    }
  },
  modules: {
  }
})
