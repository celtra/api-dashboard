<template>
  <div id="app">
    <Creatives />
    <p>{{ userId }}</p>
    <p>{{ secretKey }}</p>
    <p>{{ apiUrl }}</p>
  </div>
</template>

<script>
import Creatives from './components/Creatives.vue'

export default {
  name: 'App',
  components: {
    Creatives
  },
  data() {
    return {
      userId: process.env.VUE_APP_CELTRA_USER_ID,
      secretKey: process.env.VUE_APP_CELTRA_SECRET_KEY,
      apiUrl: process.env.VUE_APP_CELTRA_URL
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
