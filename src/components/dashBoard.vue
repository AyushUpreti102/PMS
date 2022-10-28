<template>
    <v-container>
        <v-snackbar v-model="users.snackBar" timeout="2000" color="success" top>{{ users.message }}</v-snackbar>
        <!-- <v-btn @click="listPolls">List Polls</v-btn> -->
        <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn style="position: absolute; right: 20px;" depressed color="warning" v-bind="attrs" v-on="on">Add Poll</v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-3">
            Add Poll
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field label="Poll Title" v-model="title"></v-text-field>
            <v-text-field label="Poll Options" v-model="option"></v-text-field>
            <v-btn depressed color="red lighten-1" @click="addOptions">Add option</v-btn>
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
            <PollCard />
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import NavBar from './navBar.vue';
import HomePage from './HomePage.vue';

export default {
    name: "dashBoard",
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    data() {
        return {
            dialog: false,
            title: '',
            option: '',
        };
    },
    methods: {
        addPoll(){
            this.dialog = false
            this.$store.dispatch('addPoll');  
        },
        addOptions(){
            console.log('');
        },
        logout(){
            this.$store.dispatch('logout', {router: this.$router, component: HomePage})
        },
        listPolls(){
            this.$store.dispatch('listPolls')
        }
    },
    components: { PollCard, NavBar  }
}
</script>
