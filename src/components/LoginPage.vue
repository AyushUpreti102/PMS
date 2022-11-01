<template>
    <v-container>
        <v-main>
            <NavBar>
                <template v-slot:Login>
                    <v-btn left text>Login</v-btn>
                </template>
                <template v-slot:SignUp>
                    <v-btn right text>SignUp</v-btn>
                </template>
            </NavBar>
        </v-main>
        <v-snackbar v-model="snackBar" timeout="2000" color="success" top>{{message}}</v-snackbar>
        <v-layout>
            <v-flex>
                <v-card elevation="0" width="60%" class="mx-auto">
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
import NavBar from './navBar.vue';

export default {
    name: "LoginPage",
    data() {
        return {
            loginDetails: { userName: '', password: null },
        }
    },
    computed: {
        snackBar() {
            return this.$store.getters.snackBar;
        },
        message() {
            return this.$store.getters.message;
        },
        logUser() {
            return this.$store.getters.logUser;
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', { loginDetails: this.loginDetails, router: this.$router, component: dashBoard });
            if (this.logUser) {
                console.log(this.logUser);
            }
        },
    },
    components: { NavBar }
}
</script>
<style scoped>
.mx-auto {
    padding: 50px 10px;
    border: 1px solid lightgray;
}
</style>
