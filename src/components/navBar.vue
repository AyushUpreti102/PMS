<template>
    <v-app-bar elevation="0" app>
        <v-app-bar-title>
            <router-link :to="route" style="cursor: pointer; text-decoration: none; color: black;">
                <h2 class="display-1">Let's Vote</h2>
            </router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <router-link to="/Login" class="btn btn1">
            <v-btn left text v-if="showBtnsInNavBar.login">Login</v-btn>
            </router-link>
            <router-link to="/Signup" class="btn btn2">
                <v-btn right text v-if="showBtnsInNavBar.signup">SignUp</v-btn>
            </router-link>
            <ToolTip  v-if="showBtnsInNavBar.tooltip"/>
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
        },
        route(){
            let show = localStorage.getItem('show')
            if(show){
                return '/dashBoard'
            }
            else{
                return '/'
            }
        }
        
    },
}
</script>

<style scoped>
.btn {
    text-decoration: none;
}
</style>