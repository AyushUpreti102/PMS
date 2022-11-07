<template>
  <v-app style="background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);">
    <v-snackbar v-model="snackBar.snack" timeout="2000" :color="snackBar.color" top>{{ snackBar.message }}</v-snackbar>
    <v-main>
      <navBar/>
      <router-view></router-view>
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
  }
};
</script>
