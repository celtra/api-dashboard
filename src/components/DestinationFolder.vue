<template>
    <div>
        <hr>
            Choose destination folder
        <hr>
        <div class="current-folder" v-if="getDestinationFolder">
            Current Folder: <b>{{ getDestinationFolder.name }}</b>
        </div>
        <div v-else class="current-folder">
            Select Folder
        </div>
        <div class="folder" v-for="folder in getDestinationFolders" v-bind:key="folder.id">
            <div class="creative-list">
                <div class="creative"  v-on:click="goToFolder(folder)">
                    <img class="creative-alt" alt="Logo" src="@/assets/folder.png">
                    <div class="creative-name">
                        {{ folder.name }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="getDestinationFolder">
            <button  v-on:click="createCreative()" class="create-btn">Create creative</button>
        </div>
    </div>
</template>

<script>
import  { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'DestinationFolder',
    props: {
        function: { type: Function },
    },
    methods: {
        ...mapActions([
            'fetchDestinationFolders',
        ]),

        ...mapMutations([
            'setDestinationFolder',
        ]),

        goToFolder: function(folder) {
            console.log("Go to folder", folder.id)
            this.setDestinationFolder(folder)
            this.fetchDestinationFolders(folder.id);
        },

        createCreative() {
            if (this.getDestinationFolder) {
                console.log('Destination folder ->', this.getDestinationFolder.id)
                this.function(this.getDestinationFolder.id)
            }
        }
    },
    created() {
        this.fetchDestinationFolders();
    },

    computed: mapGetters([
        'getDestinationFolders',
        'getDestinationFolder',
    ]),
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

  .creative, .folder {
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
    margin: 5px;
  }

  .creative-alt {
    width: 80px;
    height: auto;
    margin: 0;
  }

  .creative:hover {
    opacity: 0.6;
    cursor: pointer;
  }

   .create-btn:hover {
     opacity: 0.6;
     cursor: pointer;
  }

  .create-btn {
    margin-top: 50px;
    background-color: #5df086;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }

  .current-folder {
      font-size: 20px;
  }
</style>
