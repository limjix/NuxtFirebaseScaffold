<template>
  <v-navigation-drawer
    app
    v-bind:value="value"
    v-on:input="$emit('input', $event)"

    temporary
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props:{
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        drawer:false,
        items: [
          { title: 'Home', icon: 'mdi-file-table' },
          { title: 'About', icon: 'mdi-file-table' },
        ],
      }
    },
  }
</script>

<style scoped>

</style>
