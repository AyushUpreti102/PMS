<template>
    <v-container>
        <v-card elevation="0" class="profileCard">
            <v-card-title>
                <h1 style="color: white;">Profile</h1>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>
                <v-card elevation="0" style="background-color: transparent;">
                    <div class="d-flex">
                        <v-card-title>
                            <v-icon size="200" color="blue darken-4">mdi-account-circle</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="v-card items">
                            <v-list style="background-color: transparent;">
                                <v-list-item>
                                    <v-list-item-title class="userInfo userNAme">
                                        <div>
                                            <span>Username :</span>
                                            <span style="font-weight: lighter;">{{' '+token.username}}</span>
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title class="userInfo role">
                                        <div>
                                            <span>Role :</span>
                                            <span style="font-weight: lighter;">{{' '+token.role}}</span>
                                        </div>
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
        token(){
            let token = localStorage.getItem('token');
            return JSON.parse(token)
        }
    },
    mounted() {
        this.$store.dispatch('access', localStorage.getItem('token'));
        this.$store.dispatch('showBtnsInNavBar');
    },
}
</script>
<style scoped>
.userInfo {
    font-size: 30px;
    font-family: sans-serif;
    font-weight: bold;
    color: white;
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
    background-image: linear-gradient(to left, #8360c3, #2ebf91);
}

@media only screen and (max-width: 650px) {
    .d-flex {
        flex-direction: column;
    }

    .profileCard {
        height: 500px;
    }
    .userInfo {
        font-size: 25px;
        font-family: sans-serif;
        font-weight: bold;
        color: white;
    }
}
</style>