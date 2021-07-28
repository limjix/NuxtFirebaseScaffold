<template>
  <v-app>
    <AppBar />

    <!-- Sizes your content based upon application components -->
    <v-main class="main-div">
      <!-- Provides the application the proper gutter -->
      <div
        class="shader"
        v-if="$route.name == `profile-id` && !$vuetify.breakpoint.mobile"
      ></div>
      <v-container
        fluid
        class="main-cont"
        :class="
          $route.name == `profile-id` && !$vuetify.breakpoint.mobile
            ? 'push-up'
            : ''
        "
      >
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "~/components/AppComponents/AppBar.vue";
import Footer from "~/components/AppComponents/Footer.vue";
export default {
  components: {
    AppBar,
    Footer,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.main-cont {
  width: 80%;
  padding-bottom: 100px;
}
.main-div {
  background-color: #f5f5f5;
}
.shader {
  background-color: #e3e3e3;
  height: 535px;
}
.push-up {
  position: relative;
  bottom: 535px;
}
.footer {
  position: absolute;
  bottom: 0;
}
@media only screen and (max-width: 800px) {
  .main-cont {
    width: 100%;
  }
  .main-div {
    background-color: #f5f5f5;
  }
}
</style>