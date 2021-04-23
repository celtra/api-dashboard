<template>
  <div>
    <div class="creative" v-for="folder in getCreatives" v-bind:key="folder.folderId">
      <hr>
      <div class="folder-name">{{ folder.folderName }}</div>
      <hr>
      <div class="creative-list">
        <div class="creative" v-for="creative in folder.creatives" v-bind:key="creative.id">
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
  .folder-name {
    font-size: 20px;
    font-weight: bold;
  }

  .creative-list {
    display: flex;
    justify-content: center;
  }

  .creative {
    color: white;
    margin: 30px 10px 10px 10px;
  }

  .creative-image {
    width: 100px;
    height: 100px;
    border: 1px solid;
    margin: auto;
  }

  .creative-name {
    margin: 10px;
  }

  .creative-alt {
    margin: 25px 0 0 0;
  }
</style>
