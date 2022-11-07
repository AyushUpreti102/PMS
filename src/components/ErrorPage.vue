<template>
    <v-container class="card">
        <v-card class="card__errorCard" elevation="0">
            <v-card-title class="errorCard__title">404</v-card-title>
            <v-card-subtitle class="errorCard__subtitle subtitle 1">Ooops!!</v-card-subtitle>
            <v-card-subtitle class="errorCard__subtitle subtitle 2">THIS PAGE DOESN'T EXIST OR IS UNAVAILABLE</v-card-subtitle>
            <v-card-actions class="errorCard__action">
                <router-link to="/" style="text-decoration: none;">
                    <v-btn style="width: 200px; height: 50px; font-size: 18px;">Go to Home</v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'ErrorPage',
}
</script>
<style scoped>
    .card{
        height: 100%;
        width: 100%;
    }
    .card__errorCard{
        height: 100%;
        background-color: transparent;
    }
    .errorCard__title{
        justify-content: center;
        font-size: 200px;
        height: 50%;
    }
    .errorCard__subtitle{
        text-align: center;
        font-size: 30px;
    }
    .errorCard__action{
        justify-content: center;
        height: 15%;
    }
</style>