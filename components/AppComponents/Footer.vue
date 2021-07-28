<template>
  <v-footer app inset class="font-weight-medium footer">
    <v-col class="text-center d-flex justify-center align-center" cols="12">
      <h4>
        &copy; <strong>Study Hub Asia—{{ new Date().getFullYear() }}</strong>
      </h4>

      <div class="mx-4">
        <v-icon @click="facebook" small>mdi-facebook</v-icon>
        <v-icon @click="twitter" small>mdi-twitter</v-icon>
        <v-icon @click="instagram" slot="" small>mdi-instagram</v-icon>
      </div>
      <h4 class="feedback">
        <a @click.prevent="">We would love to hear your feedback</a>
      </h4>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    facebook() {},
    twitter() {},
    instagram() {},
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
}
</style>
