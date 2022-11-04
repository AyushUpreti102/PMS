<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <v-snackbar v-model="snackBar.snack" timeout="2000" color="success" top>{{ snackBar.message }}</v-snackbar>
      <navBar/>
    </v-main>
  </v-app>
</template>

<script>
import navBar from './components/navBar.vue'
export default {
  name: "App",
  components: {navBar},
  computed: {
    snackBar() {
      return this.$store.getters.snackBar;
    },
    message() {
      return this.$store.getters.message;
    },
  }
};
</script>
