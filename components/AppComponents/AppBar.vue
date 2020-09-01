<template>
  <v-app-bar app color="primary" >
    <v-app-bar-nav-icon @click.prevent="$emit('sideNavToggle')" color="white"></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">Home</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="isAuthenticated" icon @click="logout">
      <v-icon color="white">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("login");
      });
    },
  }

}
</script>

<style scoped>

</style>
