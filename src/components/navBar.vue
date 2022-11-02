<template>
    <v-app-bar elevation="0" app>
        <v-app-bar-title>
            <h2>Poll Management System</h2>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/Login" class="btn btn1">
            <slot name="Login"></slot>
            </router-link>
            <router-link to="/Signup" class="btn btn2">
                <slot name="SignUp"></slot>
            </router-link>
            <slot name="Logout"></slot>
    </v-app-bar>
</template>
<script>
export default {
    name: 'navBar',
}
</script>

<style scoped>
.btn {
    text-decoration: none;
}
</style>