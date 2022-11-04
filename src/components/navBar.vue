<template>
    <v-app-bar elevation="0" app>
        <v-app-bar-title>
            <router-link to="/" style="cursor: pointer; text-decoration: none; color: black;">
                <h2 class="display-1">Lets Vote</h2>
            </router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/Login" class="btn btn1">
            <v-btn left text v-if="showBtnsInNavBar">Login</v-btn>
            </router-link>
            <router-link to="/Signup" class="btn btn2">
                <v-btn right text v-if="showBtnsInNavBar">SignUp</v-btn>
            </router-link>
            <ToolTip  v-if="!showBtnsInNavBar"/>
    </v-app-bar>
</template>
<script>
import ToolTip from './ToolTip.vue';
export default {
    name: 'navBar',
    components: { ToolTip },
    computed: {
        show() {
            let show = localStorage.getItem('show')
            return JSON.parse(show);
        },
        showBtnsInNavBar(){
            return this.$store.getters.showBtnsInNavBar;
        }
    }
}
</script>

<style scoped>
.btn {
    text-decoration: none;
}
</style>