<template>
    <v-app-bar elevation="0">
        <v-app-bar-title>
            <h2>Poll Management System</h2>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/LoginPage" class="btn btn1">
            <v-btn left text>Login</v-btn>
        </router-link>
        <router-link to="/Signup" class="btn btn2">
            <v-btn right text>SignUp</v-btn>
        </router-link>
    </v-app-bar>
</template>
<script>
export default {
    name: 'navBar'
}
</script>

<style scoped>
.btn {
    text-decoration: none;
}
</style>