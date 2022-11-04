<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card elevation="0" width="60%" class="mx-auto">
                    <v-card-title>Login</v-card-title>
                    <v-card-subtitle>
                        <v-form>
                            <v-text-field label="Username" required v-model="loginDetails.userName" @keyup.enter="login"></v-text-field>
                            <v-text-field label="Password" type="password" required v-model="loginDetails.password" @keyup.enter="login">
                            </v-text-field>
                            <v-btn depressed color="primary" @click="login">Login <v-icon>mdi-login-variant</v-icon></v-btn>
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
    data() {
        return {
            loginDetails: { userName: '', password: '' }
        }
    },
    mounted(){
        this.$store.dispatch('showBtnsInNavBar');
    },
    methods: {
        login() {
            if(this.loginDetails.userName!=='' && this.loginDetails.password!==''){
                this.$store.dispatch('login', { loginDetails: this.loginDetails, router: this.$router, component: dashBoard });
            }
            else {
                this.$store.dispatch('validate', 'enter user name and password')
            }
        },
        trigger() {
            this.$refs.sendReply.click();
        }
    },
}
</script>
<style scoped>
.mx-auto {
    padding: 50px 10px;
    border: 1px solid lightgray;
}
</style>
