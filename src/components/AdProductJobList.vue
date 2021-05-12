<template>
    <div class="status-title">
        <h1>AdProductJobs list</h1>
        <div v-if="adProductJobs.length > 0">
            <div v-for="adProductJob in adProductJobs" v-bind:key="adProductJob.id">
                #{{ adProductJob.id }} => {{ adProductJob.status }}
            </div>
        </div>
        <div v-else>
            You do not have any AdProductJob
        </div>
        <div>
            <button  v-on:click="refreshList()" class="create-btn">Refresh List</button>
        </div>
    </div>
</template>

<script>
import  { mapActions } from 'vuex';

export default {
    name: 'AdProductJobList',
    methods: {
        ...mapActions([
            'fetchAdProductJobList'
        ]),

        refreshList() {
            console.log("Rehreshing AdProductJob list ...")
            this.getAddProductJobs()
        },

        getAddProductJobs() {
            this.fetchAdProductJobList().then(adProductJobs => {
                this.adProductJobs = adProductJobs
                console.log("adProductJobs", this.adProductJobs)
            })
        }
    },
    created() {
        this.getAddProductJobs()
    },
    data() {
        return {
            adProductJobs: [],
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .status-title {
    color: white;
    margin: 30px 10px 10px 10px;
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
</style>
