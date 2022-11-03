<template>
    <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn depressed v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list width="200">
                <v-list-item v-for="(item, index) in items" :key="index">
                    <v-list-item-title @click="task(item.title)" style="cursor: pointer;">{{ item.title }}
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
export default {
    name: 'ToolTip',
    props: ['items'],
    data() {
        return {
            show: false,
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
            else {
                this.$router.push({ path: '/List', component: ListOfUsers })
            }
        }
    }
}
</script>