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
    poll: (state)=>{
      return state.poll;
    },
    snackBar: (state)=>{
      state.snackBar
    },
    message: (state)=>{
      return state.message
    }
  },
  mutations: {
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
      state.poll.push({id: data.data.id, title: data.data.title, options: data.data.options, radioGroup: null});
      console.log(data.data);
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
      console.log(resp.error, resp.index);
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
    } 
  },
  actions: {
    login: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}`).then((resp)=>{
        context.commit('LOGIN', {resp: resp.data, router: payload.router});
      })
    },
    addUser: (context, payload)=>{
      console.log(payload.loginDetails.userName, payload.loginDetails.role, payload.loginDetails.password);
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.loginDetails.userName}&password=${payload.loginDetails.password}&role=${payload.loginDetails.role}`).then((resp)=>{
        context.commit('ADD_USER', resp);
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
    }
  },
  modules: {
  }
})
