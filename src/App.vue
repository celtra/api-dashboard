<template>
  <div id="app">
    <h2>Ad products</h2>
    <Creatives />
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
      appId: process.env.VUE_APP_CELTRA_APP_ID,
      secretKey: process.env.VUE_APP_CELTRA_SECRET_KEY,
      apiUrl: process.env.VUE_APP_CELTRA_URL
    }
  }
}
</script>

<style>
  body, html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100%;
     background-color: #000014;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }

  h2 {
    color: white;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
</style>
