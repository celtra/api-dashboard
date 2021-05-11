<template>
    <div class="status-title">
        <h1>AdProductJobId: #{{ this.$route.params.id }}</h1>
        <div>
            STATUS: <b>{{ this.status }}</b>
        </div>
        <div>
            <button  v-on:click="refreshStatus()" class="create-btn">Refresh status</button>
        </div>
    </div>
</template>

<script>
import  { mapActions } from 'vuex';

export default {
    name: 'CreativeStatues',
    props: {
        function: { type: Function },
    },
    methods: {
        ...mapActions([
            'checkAdProductJobStatus'
        ]),

        refreshStatus() {
            this.checkAdProductJobStatus(this.$route.params.id).then(status => {
                this.status = status
                console.log("Refreshing status... =>", this.status)
            });
        }
    },
    created() {
        this.checkAdProductJobStatus(this.$route.params.id).then(status => this.status = status);
    },
    data() {
        return {
            status: null,
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
