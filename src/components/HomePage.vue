<template>
    <v-container>
        <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{ snackBar.message }}</v-snackbar>
        <img src="../assets/poll-500x500.webp" alt="error" style="width: 100%; height: 600px;">
    </v-container>
</template>
<script>

export default {
    name: "HomePage",
    computed: {
        snackBar() {
            return this.$store.getters.snackBar;
        },
    },
    mounted(){
        this.$store.dispatch('showBtnsInNavBar');
    }
}
</script>
