import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    snackBar:{
      snack: false,
      message: '', 
    } , 
    poll: [],
    users: [],
    pollPage: {
      start: 0,
      end: 12,
      totalPage: 0
    },
    usersPage: {
      start: 0,
      end: 72,
      totalPage: 0
    },
    boilerplate: {
      pollPage: true,
      userPage: true,
    },
    items:[
      { title: 'DashBoard', access: 'ifLogged', icon: 'mdi-tablet-dashboard' },
      { title: 'Profile', access: 'both', icon: 'mdi-account' },
      { title: 'List Of Users', access: 'admin', icon: 'mdi-account-group' },
      { title: 'Logout', access: 'both', icon: 'mdi-logout' },
    ],
    showBtnsInNavBar: true,
  },
  getters: {
    poll: (state)=>{
      return state.poll;
    },
    snackBar: (state)=>{
      return state.snackBar
    },
    users: (state)=>{
      return state.users;
    },
    totalPageInPoll: (state)=>{
      return state.pollPage.totalPage;
    },
    totalPageInUser: (state)=>{
      return state.usersPage.totalPage
    },
    boilerplate: (state)=>{
      return state.boilerplate;
    },
    items: (state)=>{
      return state.items
    },
    showBtnsInNavBar: (state)=>{
      return state.showBtnsInNavBar;
    }
  },
  mutations: {
    LOGIN: (state, payload)=>{
      let resp = payload;
      if(resp.resp.error===0){
        let decode = VueJwtDecode.decode(resp.resp.token);
        localStorage.setItem('user', decode.role);
        localStorage.setItem('userName', decode.username);
        localStorage.setItem('logUser', true)
        let role = localStorage.getItem('user');
        if(role==='admin'){
          localStorage.setItem('show', true)
        }
        else{
          localStorage.setItem('show', false);
        }
        resp.router.push({path: '/dashBoard', component: payload.component});
        state.snackBar.message='login successfully';
        state.snackBar.snack=true;
      }
      else{
        state.snackBar.message = 'password or email do not match enter again';
        state.snackBar.snack=true;
      }
    },
    ADD_USER: (state, payload)=>{
      let resp = payload
      if(resp.resp.error===0){
        resp.router.push({path: '/Login', component: payload.component})
        state.snackBar.message='Signup completed please login to continue'
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
      state.snackBar.message='poll added';
      state.snackBar.snack=true;
    },
    LIST_POLLS: (state, payload)=>{
      state.poll= payload.data.data.slice(state.pollPage.start, state.pollPage.end);
      state.pollPage.totalPage= Math.ceil(payload.data.data.length/12);
      state.boilerplate.pollPage=false;
    },
    VOTE:(state, payload)=>{
      let resp =JSON.parse(payload);
      state;
      resp;
    },
    CHANGE_TITLE: (state, payload)=>{
      let resp = JSON.parse(payload)
      if(resp.resp.error===0){
        state.poll[resp.index].title=resp.title
        state.snackBar.message='title changed';
        state.snackBar.snack=true;
      }
    },
    DELETE_OPTION: (state, payload)=>{
      let resp = JSON.parse(payload);
      if(resp.resp.error===0){
        state.poll[resp.pollIndex].options= resp.options;
        state.snackBar.message='option deleted';
        state.snackBar.snack=true;
      }
    },
    ADD_NEW_OPTIONS_TO_POLL: (state, payload)=>{
      let resp = JSON.parse(payload);
      if(resp.resp.error===0){
        state.poll[resp.index].options=resp.options
        state.snackBar.message='option added';
        state.snackBar.snack=true;
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
      let resp = payload
      state.snackBar.message='logged out successfully';
      state.snackBar.snack=true;
      localStorage.clear();
      resp.router.push({path: '/Login', component: payload.component});
    },
    VALIDATE(state, payload){
      state.snackBar.message=payload
      state.snackBar.snack=true;
    },
    PAGINATION: (state, payload)=>{
      if(payload.name==='userList'){
        state.usersPage.start=payload.start;
        state.usersPage.end=payload.end;
      }
      else{
        state.pollPage.start=payload.start;
        state.pollPage.end=payload.end;
      }
    },
    LIST_USERS: (state, payload)=>{
      let resp = JSON.parse(payload);
      state.users = resp.data.slice(state.usersPage.start, state.usersPage.end)
      state.usersPage.totalPage = Math.ceil(resp.data.length/72);
      state.boilerplate.userPage=false;
    },
    ACCESS: (state, payload)=>{
      state.items[2].access=payload
    },
    SHOW_BTNS_IN_NAVBAR: (state, payload)=>{
      let logUser = JSON.parse(localStorage.getItem('logUser'))
      if(logUser===true){
        state.showBtnsInNavBar=false;
        state.items[0].access='ifLogged'
      }
      else{
        state.showBtnsInNavBar=true;
        state.items[0].access='notLogged'
      }
      if(payload==='dashBoard'){
        state.items[0].access='notLogged'
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
      let details = JSON.parse(payload.details);
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
      axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.pollId}&option_text=${payload.option}`).then((resp)=>{
        context.commit('DELETE_OPTION', JSON.stringify({resp: resp.data, pollIndex: payload.index, options: payload.options}));
      })
    },
    addNewOptionsToPoll: (context, payload)=>{
      axios.get(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${payload.option}`).then((resp)=>{
        context.commit('ADD_NEW_OPTIONS_TO_POLL', JSON.stringify({resp: resp.data, index: payload.index, options: payload.options}));
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
    },
    listUsers: (context)=>{
      axios.get('https://secure-refuge-14993.herokuapp.com/list_users').then((resp)=>{
        context.commit('LIST_USERS', JSON.stringify(resp.data));
      })
    },
    access: (context, payload)=>{
      context.commit('ACCESS', payload)
    },
    showBtnsInNavBar: (context, payload)=>{
      context.commit('SHOW_BTNS_IN_NAVBAR', payload)
    }
  },
  modules: {
  }
})
