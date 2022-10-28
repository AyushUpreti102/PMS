<template>
    <v-container>
        <v-snackbar v-model="users.snackBar" timeout="2000" color="success" top>{{users.message}}</v-snackbar>
        <v-layout>
            <v-flex>
                <v-card elevation="1" width="60%" class="mx-auto">
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

export default {
    name: "SignUp",
    data() {
        return {
            items: ['Admin', 'guest'],
            signUpDetails: {userName: '', role: '', password: null}
        }
    },
    computed: {
        users(){
            return this.$store.getters.users;
        }
    },
    methods:{
        addUser(){
            this.$store.dispatch('addUser', this.signUpDetails);
        }
    }
}
</script>
<style scoped>
.mx-auto {
    padding: 50px 10px;
}
</style>
