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
    snackBar:{
      snack: false,
      message: '', 
    } , 
    poll: [],
    start: 0,
    end: 12,
  },
  getters: {
    poll: (state)=>{
      return state.poll;
    },
    snackBar: (state)=>{
      return state.snackBar
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
        state.snackBar.message='login successfully';
        state.snackBar.snack=true;
        console.log(state.snackBar);
      }
      else{
        state.snackBar.message = 'password or email do not match enter again';
        state.snackBar.snack=true;
      }
    },
    ADD_USER: (state, payload)=>{
      console.log(payload.resp.error);
      state.newUser= payload.resp
      if(payload.resp.error===0){
        payload.router.push({path: '/Login', component: payload.component})
        state.snackBar.message='Signup completed'
        state.snackBar.snack=true;
      }
      else{
        state.snackBar.message=payload.data.message;
        state.snackBar.snack=true;
      }
    },
    ADD_POLL: (state, payload)=>{
      let data = JSON.parse(payload)
      state.poll.push({_id: data.data.id, title: data.data.title, options: data.data.options, radioGroup: null});
      console.log(data);
    },
    LIST_POLLS: (state, payload)=>{
      state.poll= payload.data.data.slice(state.start, state.end);
    },
    VOTE:(state, payload)=>{
      let resp =JSON.parse(payload);
      state;
      console.log(resp);
    },
    CHANGE_TITLE: (state, payload)=>{
      let resp = JSON.parse(payload)
      if(resp.resp.error===0){
        state.poll[resp.index].title=resp.title
      }
    },
    DELETE_OPTION: (state, payload)=>{
      let resp = JSON.parse(payload);
      console.log(resp);
      if(resp.error===0){
        //
      }
    },
    ADD_NEW_OPTIONS_TO_POLL: (state, payload)=>{
      let resp = JSON.parse(payload.data);
      if(resp.error===0){
        console.log(resp, payload.pollIndex, payload.option);
        state.poll[payload.pollIndex].options.push({option: payload.option, vote: 0})
      }
    },
    DELETE_POLL: (state, payload)=>{
      const resp = JSON.parse(payload);
      if (resp.error===0) {
        state.poll.splice(resp.index, 1);
        state.snackBar.message='Poll deleted successfully'
        state.snackBar.snack=true;
      } else {
        state.snackBar.snack=true;
        state.snackBar.message='! invalid poll'
      }
    },  
    LOGOUT: (state, payload)=>{
      console.log(payload);
      state.snackBar.message='logged out successfully';
      state.snackBar.snack=true;
      localStorage.clear();
      payload.router.push({path: '/Login', component: payload.component});
    },
    VALIDATE(state, payload){
      state.snackBar.message=payload
      state.snackBar.snackBar=true;
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
    changeTitle: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.pollId}&title=${payload.pollTitle}`).then((resp)=>{
        context.commit('CHANGE_TITLE', JSON.stringify({resp: resp.data, title: payload.pollTitle, index:payload.index}));
      })
    },
    deletePollOptions: (context, payload)=>{
      console.log(payload,payload.pollId,payload.option);
      axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.pollId}&option_text=${payload.option}`).then((resp)=>{
        context.commit('DELETE_OPTION', JSON.stringify({resp: resp.data, pollIndex: payload.index, options: payload.options}));
      })
    },
    addNewOptionsToPoll: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${payload.option}`).then((resp)=>{
        context.commit('ADD_NEW_OPTIONS_TO_POLL', {data: JSON.stringify(resp.data), pollIndex: payload.pollIndex, option: payload.option});
      })
    },
    deletePoll: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload.id}`).then((resp)=>{
        context.commit('DELETE_POLL', JSON.stringify({error: resp.data.error, index: payload.idx}));
      })
    },
    logout: (context, payload)=>{
      context.commit('LOGOUT', payload);
    },
    validate: (context, payload)=>{
      context.commit('VALIDATE', payload);
    },
    pagination: (context, payload)=>{
      context.commit('PAGINATION', payload);
    }
  },
  modules: {
  }
})
