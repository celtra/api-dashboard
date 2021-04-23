<template>
  <div id="home">
    <Creatives />
  </div>
</template>

<script>
import Creatives from '../components/Creatives.vue'

export default {
  name: 'Home',
  components: {
    Creatives
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

  #home {
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