<template>
    <v-container>
        <v-skeleton-loader type="card" v-if="boilerplate"></v-skeleton-loader>
        <v-layout row wrap v-if="!boilerplate">
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
            <v-pagination v-model="page" :length="totalPageInUser" :total-visible="6" style="margin-top: 10px;" @input="next" v-if="!boilerplate">
            </v-pagination>
            </div>
    </v-container>
</template>
<script>

export default {
    name: "ListOfUsers",
    data(){
        return{
            page: 1,
            itemsPerPage: 72,
        }
    },
    mounted() {
        this.$store.dispatch('listUsers')
        this.$store.dispatch('showBtnsInNavBar');
    },
    computed: {
        users() {
            return this.$store.getters.users;
        },
        totalPageInUser(){
            return this.$store.getters.totalPageInUser;
        },
        boilerplate() {
            return this.$store.getters.boilerplate.userPage
        }
    },
    methods: {
        next() {
            let page = (this.page - 1) * this.itemsPerPage;
            let items = (this.page - 1) * this.itemsPerPage + this.itemsPerPage;
            this.$store.dispatch("pagination", { start: page, end: items, name: 'userList' });
            this.$store.dispatch('listUsers');
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            })
        }
    }
}
</script>