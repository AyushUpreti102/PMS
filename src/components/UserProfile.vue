<template>
    <v-container>
        <v-card elevation="0">
            <v-card-title>
                <h1>Profile</h1>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>
                <v-card elevation="0" class="profileCard">
                    <div class="d-flex">
                        <v-card-title>
                            <v-icon size="200">mdi-account-circle</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="v-card items">
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title class="userInfo userNAme">{{ 'Username : ' + userName }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title class="userInfo role">{{ 'Role : ' + role }}
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card-subtitle>
                    </div>
                </v-card>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: "UserProfile",
    computed: {
        role() {
            let role = localStorage.getItem("user");
            return role;
        },
        userName() {
            let userName = localStorage.getItem("userName");
            return userName;
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
        this.$store.dispatch('access', localStorage.getItem('user'));
        this.$store.dispatch('showBtnsInNavBar');
    },
}
</script>
<style scoped>
.userInfo {
    font-size: 30px;
    font-family: sans-serif;
    font-weight: bold;
}

.userNAme {
    margin-top: 10px;
}

.items {
    position: relative;
    left: 2vw;
    top: 10vh;
}

.profileCard {
    border: 5px solid lightgrey;
}

@media only screen and (max-width: 650px) {
    .d-flex {
        flex-direction: column;
    }

    .profileCard {
        height: 500px;
    }
}
</style>