<template>
    <v-container>
        <v-snackbar v-model="snackBar" timeout="2000" color="success" top>{{message}}</v-snackbar>
        <!-- <v-btn @click="listPolls">List Polls</v-btn> -->
        <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn style="position: absolute; right: 20px;" depressed color="warning" v-bind="attrs" v-on="on" v-if="show">Add Poll</v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-3">
            <p>Add Poll</p>
            <v-spacer></v-spacer>
            <v-btn text style="position: relative; bottom: 10px;" @click="clearPoll">X</v-btn>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Poll Title" v-model="title"></v-text-field>
            <div class="d-flex">
                <v-text-field label="Poll Options" v-model="option"></v-text-field>
                <v-btn depressed color="white" @click="addOptions" style="margin-top: 10px;"><v-icon>mdi-plus-box</v-icon></v-btn>
            </div>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Added options</v-list-item-title>
                    <v-list-item-subtitle v-for="(val, i) in pollOptions" :key="i">
                        <div class="d-flex">
                            <p>{{'- '+val.option}}</p>
                            <v-spacer></v-spacer>
                            <v-icon style="cursor: pointer;" @click="deleteOption(i)">mdi-delete</v-icon>
                        </div>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addPoll">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        <v-main>
            <NavBar>
                <template v-slot:Logout>
                    <v-btn right text @click="logout">Logout</v-btn>
                </template>
            </NavBar>
            <PollCard @changePage="change"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import NavBar from './navBar.vue';
import Login from './LoginPage.vue';

export default {
    name: "dashBoard",
    computed: {
        snackBar() {
            return this.$store.getters.snackBar;
        },
        message() {
            return this.$store.getters.message;
        },
        show(){
            let show = localStorage.getItem('show')
            return JSON.parse(show);
        }
    },
    mounted() {
        this.$store.dispatch('listPolls');
    },
    data() {
        return {
            dialog: false,
            title: '',
            option: '',
            pollOptions: [],
        };
    },
    methods: {
        addPoll(){
            if(this.title!==''){
                if (this.pollOptions.length !== 0) {
                    this.dialog = false
                    this.$store.dispatch('addPoll', JSON.stringify({title: this.title, options: this.pollOptions}));  
                    this.pollOptions.splice(0, this.pollOptions.length);
                    this.title=''
                } else {
                    this.$store.dispatch('validate', 'add options to the poll');   
                }
            }
            else{
                this.$store.dispatch('validate', 'Add title for poll');
            }
        },
        addOptions(){
            this.pollOptions.push({option: JSON.parse(JSON.stringify(this.option)), vote: 0});
            this.option=''
        },
        clearPoll(){
            this.pollOptions.splice(0, this.pollOptions.length);
            this.title=''
            this.dialog=false;
        },
        deleteOption(i){
            this.pollOptions.splice(i, 1);
        },
        logout(){
            this.$store.dispatch('logout', {router: this.$router, component: Login})
        },
        listPolls(){
            this.$store.dispatch('listPolls')
        },
        change(){
            this.$store.dispatch('listPolls')
        }
    },
    components: { PollCard, NavBar  }
}
</script>
