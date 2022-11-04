<template>
    <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn depressed v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list width="200">
                <v-list-item v-for="(item, index) in items" :key="index" :class="{'display': item.access==='guest' || item.access==='notLogged'}">
                    <v-list-item-title @click="task(item.title)" style="cursor: pointer;"
                        v-if="item.access==='admin' || item.access==='both' || item.access==='ifLogged'">
                        <div class="d-flex">
                            <p>{{ item.title }}</p>
                            <v-spacer></v-spacer>
                            <v-icon style="margin-bottom: 15px;">{{item.icon}}</v-icon>
                        </div>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
import Login from './LoginPage.vue';
import UserProfile from './UserProfile.vue';
import ListOfUsers from './ListOfUsers.vue';
import dashBoard from './dashBoard.vue'
export default {
    name: 'ToolTip',
    data() {
        return {
            show: false,
        }
    },
    computed: {
        items(){
            return this.$store.getters.items;
        }
    },
    methods: {
        task(val) {
            if (val === 'Logout') {
                this.$store.dispatch('logout', { router: this.$router, component: Login })
            }
            else if (val === 'Profile') {
                this.$router.push({ path: '/Profile', component: UserProfile })
            }
            else if(val==='DashBoard'){
                this.$router.push({ path: '/dashBoard', component: dashBoard })
            }
            else {
                this.$router.push({ path: '/List', component: ListOfUsers })
            }
        },
    }
}
</script>
<style scoped>
.display {
    display: none;
}
</style>