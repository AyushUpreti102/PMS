<template>
    <v-container>
        <v-snackbar v-model="users.snackBar" timeout="2000" color="success" top>{{ users.message }}</v-snackbar>
        <v-layout>
            <v-flex>
                <v-card elevation="0" width="60%" class="mx-auto">
                    <v-card-title>Poll Card</v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'dashBoard',
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
}
</script>
<style scoped>
.mx-auto {
    border: 1px solid lightgray;
}
</style>