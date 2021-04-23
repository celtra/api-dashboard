<template>
  <div class="Info">
    <h1>Creative with id {{ this.$route.params.id }}</h1>
    <CreativeInfo :id="this.$route.params.id" />
  </div>
</template>

<script>
import CreativeInfo from '../components/CreativeInfo.vue'

export default {
  name: 'Info',
  components: {
    CreativeInfo
  },
}
</script>
<style>
 h1 {
   color: white;
 }
</style>
