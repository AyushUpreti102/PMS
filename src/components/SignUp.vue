<template>
    <v-container>
        <v-layout>
            <v-flex style="position: relative; top: 12vh;">
                <v-card elevation="0" class="mx-auto">
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
                    <router-link to="/Login">
                        <v-card-actions class="primary--text">Already a user? Login to continue</v-card-actions>
                    </router-link>
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
        this.$store.dispatch('showBtnsInNavBar', 'signup');
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
    width: 60%;
}
.primary--text{
    justify-content: center;
    cursor: pointer;
}
@media only screen and (max-width: 500px){
    .mx-auto {
        padding: 50px 10px;
        border: 1px solid lightgray;
        width: 100%
    }   
}
</style>
