<template>
  <header id="app">
    <div class="header-title" v-on:click="checkAdProductJobList()">
      <h2>Ad products<img class="creative-alt" alt="Logo" src="./assets/celtra-logo.png"></h2>
    </div>
    <router-view/>
  </header>
</template>

<script>
export default {
  name: 'App',
  methods: {
    checkAdProductJobList() {
        this.$router.push({ path: "list" })
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: white;
  text-decoration: underline;
}

.header-title:hover {
  cursor: pointer;
  opacity: 0.6;
}
</style>
