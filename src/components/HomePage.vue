<template>
    <v-container>
        <v-snackbar v-model="users.snackBar" timeout="2000" color="success" top>{{ users.message }}</v-snackbar>
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
        <img src="../assets/poll-500x500.webp" alt="error" style="width: 100%; height: 500px;">
    </v-container>
</template>
<script>
import NavBar from './navBar.vue';

export default {
    name: "HomePage",
    components: { NavBar },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
}
</script>
