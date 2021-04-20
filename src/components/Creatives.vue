<template>
  <div class="hello">
    <div v-for="creative in getCreatives" v-bind:key="creative.id">
      Name: {{ creative.name }}
      FolderId: {{ creative.folderId }}
    </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Creatives',
  methods: {
    ...mapActions(['fetchCreatives'])
  },
  computed: mapGetters(['getCreatives']),
  created() {
    this.fetchCreatives();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #0d1411;
  }
</style>
