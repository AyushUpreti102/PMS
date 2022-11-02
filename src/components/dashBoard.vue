<template>
    <v-container>
        <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{snackBar.message}}</v-snackbar>
        <v-main>
            <NavBar>
                <template v-slot:Logout>
                    <v-btn right text @click="logout">Logout</v-btn>
                </template>
            </NavBar>
            <PollDetails :btn="btn" style="position: relative; left: 40vw; bottom: 8vh;"></PollDetails>
            <PollCard @changePage="change"/>
        </v-main>
    </v-container>
</template>
<script>
import PollCard from './PollCard.vue';
import NavBar from './navBar.vue';
import Login from './LoginPage.vue';
import PollDetails from './PollDetails.vue';

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
            btn: 'Add_Poll',
        };
    },
    methods: {
        logout(){
            this.$store.dispatch('logout', {router: this.$router, component: Login})
        },
        change(){
            this.$store.dispatch('listPolls')
        },
    },
    components: { PollCard, NavBar, PollDetails }
}
</script>
