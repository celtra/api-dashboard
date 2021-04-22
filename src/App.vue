<template>
  <div id="app">
    <div class="header-title">
      <h2>Ad products<img class="creative-alt" alt="Logo" src="./assets/celtra-logo.png"></h2>
    </div>
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
  
  .header-title {
    margin-bottom: 80px;
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

  .creative-alt {
    margin-left: 10px;
    width: 50px;
    height: auto;
  }
</style>
