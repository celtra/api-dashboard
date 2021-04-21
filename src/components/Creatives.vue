<template>
  <div class="hello">
    <div class="creative" v-for="creative in getCreatives" v-bind:key="creative.id">
      <div class="creative-image">
        <img class="creative-alt" alt="Logo" src="../assets/creative.png">
      </div>
      <div>
          <div class="creative-name">
            {{ creative.name }}
          </div>
          <div class="creative-clazz">
            {{ creative.clazz }}
          </div>
      </div>
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
  .creative {
    color: white;
    margin-top: 30px;
  }

  .creative-image {
    width: 255px;
    height: 255px;
    border: 1px solid;
    margin: auto;
  }

  .creative-name {
    margin: 10px;
  }

  .creative-alt {
    margin-top: 110px;
  }
</style>
