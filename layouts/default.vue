<template>
  <v-app>
    <SideNavBar v-model="drawer"/>
    <AppBar @sideNavToggle="toggleSideBar" />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
  import AppBar from "~/components/AppComponents/AppBar.vue";
  import SideNavBar from "~/components/AppComponents/SideNavBar.vue";
  import Footer from "~/components/AppComponents/Footer.vue"
export default {
  components:{
    AppBar,
    SideNavBar,
    Footer
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    toggleSideBar() {
      this.drawer = !this.drawer
      console.log(this.drawer)
    }
  }
}
</script>
