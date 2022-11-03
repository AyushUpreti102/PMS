<template>
    <v-container>
        <a href="#"></a>
        <v-layout row wrap>
            <v-flex v-for="(v, i) in users" :key="i" xs12 sm6 md4 lg3 style="padding: 10px; min-width: 200px;">
                <v-card elevation="0" class="mx-auto" style="border: 1px solid lightgrey;">
                    <v-card-title>User Info</v-card-title>
                    <v-card-text>{{ 'User id : ' + v._id }}</v-card-text>
                    <v-card-text>{{ 'Username : ' + v.username }}</v-card-text>
                    <v-card-text>{{ 'UserRole : ' + v.role }}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="text-center">
    <a href="#" style="text-decoration: none;"><v-pagination v-model="page" :length="totalPageInUser" :total-visible="7" style="margin-top: 10px;" @input="next"></v-pagination></a>
  </div>
        <v-main>
            <navBar>
                <template v-slot:Logout>
                    <ToolTip :items="itemsList"/>
                </template>
            </navBar>
        </v-main>
    </v-container>
</template>
<script>

import navBar from './navBar.vue';

export default {
    name: "ListOfUsers",
    components: {
        navBar,
        ToolTip: () => import('./ToolTip.vue'),
    },
    computed: {
        users() {
            return this.$store.getters.users;
        },
        totalPageInUser(){
            return this.$store.getters.totalPageInUser;
        },
        itemsList(){
            let show = JSON.parse(localStorage.getItem('show'));
            if (show) {
                return  [
                    { title: 'Profile' },
                    { title: 'List Of Users' },
                    { title: 'Logout' },
                ]
            }
            else{
                return [
                    { title: 'Profile' },
                    { title: 'Logout' },
                ]
            }
        }
    },
    mounted() {
        this.$store.dispatch('listUsers')
    },
    data(){
        return{
            page: 1,
            itemsPerPage: 72,
        }
    },
    methods: {
        next() {
            let page = (this.page - 1) * this.itemsPerPage;
            let items = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;
            this.$store.dispatch("pagination", { start: page, end: items, name: 'userList' });
            this.$store.dispatch('listUsers');
        },
    }
}
</script>