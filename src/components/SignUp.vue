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
        <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{snackBar.message}}</v-snackbar>
        <v-layout>
            <v-flex>
                <v-card elevation="0" width="60%" class="mx-auto">
                    <v-card-title>Signup</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Username" required v-model="signUpDetails.userName"></v-text-field>
                            <v-select :items="items" label="Role" outlined v-model="signUpDetails.role"></v-select>
                            <v-text-field label="Password" type="password" required v-model="signUpDetails.password"></v-text-field>
                            <v-btn depressed color="primary" @click="addUser">Signup</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import NavBar from './navBar.vue';
import LoginPage from './LoginPage.vue';
export default {
    name: "SignUp",
    data() {
        return {
            items: ['admin', 'guest'],
            signUpDetails: { userName: '', role: '', password: null }
        }
    },
    computed: {
        snackBar() {
            return this.$store.getters.snackBar;
        },
        message() {
            return this.$store.getters.message;
        }
    },
    methods: {
        addUser() {
            this.$store.dispatch('addUser', { details: JSON.stringify(this.signUpDetails), router: this.$router, component: LoginPage });
        }
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
