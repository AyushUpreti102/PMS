<template>
    <v-container>
        <v-layout row wrap>
            <v-flex v-for="(v, i) in users" :key="i" xs12 sm6 md4 lg3 style="padding: 10px; min-width: 200px;">
                <v-card elevation="0" class="mx-auto" style="border: 1px solid lightgrey;">
                    <v-card-title>User {{ i }} Info</v-card-title>
                    <v-card-text>{{ 'User id : ' + v._id }}</v-card-text>
                    <v-card-text>{{ 'Username : ' + v.username }}</v-card-text>
                    <v-card-text>{{ 'UserRole : ' + v.role }}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-main>
            <navBar>
                <template v-slot:Logout>
                    <ToolTip />
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
        }
    },
    mounted() {
        this.$store.dispatch('listUsers')
    }
}
</script>