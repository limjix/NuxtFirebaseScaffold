<template>
  <v-footer
    app
    class="font-weight-medium"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>NuxtFirebaseScaffold</strong>
    </v-col>
  </v-footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>
