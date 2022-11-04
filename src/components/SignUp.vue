<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card elevation="0" width="60%" class="mx-auto">
                    <v-card-title>Signup</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field @keyup.enter="addUser" label="Username" required v-model="signUpDetails.userName"></v-text-field>
                            <v-select @keyup.enter="addUser" :items="items" label="Role" outlined v-model="signUpDetails.role"></v-select>
                            <v-text-field @keyup.enter="addUser" label="Password" type="password" required v-model="signUpDetails.password">
                            </v-text-field>
                            <v-btn depressed color="primary" @click="addUser">Signup <v-icon>mdi-arrow-right-drop-circle</v-icon></v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import LoginPage from './LoginPage.vue';
export default {
    name: "SignUp",
    data() {
        return {
            items: ['admin', 'guest'],
            signUpDetails: { userName: '', role: '', password: '' }
        }
    },
    mounted(){
        this.$store.dispatch('showBtnsInNavBar');
    },
    methods: {
        addUser() {
            if (this.signUpDetails.userName !== '' && this.signUpDetails.password !== '' && this.signUpDetails.role!=='') {
                this.$store.dispatch('addUser', { details: JSON.stringify(this.signUpDetails), router: this.$router, component: LoginPage });
            }
            else {
                this.$store.dispatch('validate', 'enter below details')
            }
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
