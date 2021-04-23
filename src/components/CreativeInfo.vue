<template>
  <div>
      {{ getCreativeInfo[0].template.templateObjects }}
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreativeInfo',
  methods: {
    ...mapActions(['fetchCreativeInfo']),
  },
  computed: mapGetters(['getCreativeInfo']),
  created() {
    this.fetchCreativeInfo(this.id);
  },
  props: {
      id: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div {
        color: white;
    }
</style>
