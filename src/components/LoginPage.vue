<template>
    <v-container>
        <v-snackbar v-model="users.snackBar" timeout="2000" color="success" top>{{users.message}}</v-snackbar>
        <v-layout>
            <v-flex>
                <v-card elevation="1" width="60%" class="mx-auto">
                    <v-card-title>Login</v-card-title>
                    <v-card-subtitle>
                        <v-form>
                            <v-text-field label="Username" required v-model="loginDetails.userName"></v-text-field>
                            <v-text-field label="Password" type="password" required v-model="loginDetails.password"></v-text-field>
                            <v-btn depressed color="primary" @click="login">Login</v-btn>
                        </v-form>
                    </v-card-subtitle>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import dashBoard from './dashBoard.vue';

export default {
    name: "LoginPage",
    data(){
        return{
            loginDetails: {userName: '', password: null},
        }
    },
    computed: {
        users(){
            return this.$store.getters.users;
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login', {loginDetails: this.loginDetails, router: this.$router, component: dashBoard});
            if(this.users.logUser){
                console.log(this.users.logUser);
            }
        },
    }
}
</script>
<style scoped>
.mx-auto {
    padding: 50px 10px;
}
</style>
