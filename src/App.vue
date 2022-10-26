<template>
  <v-app>
    <v-main>
      <navBar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navBar from './components/navBar.vue';

export default {
    name: "App",
    components: { navBar }
};
</script>
