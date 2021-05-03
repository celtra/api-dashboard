<template>
  <div>
      <select v-model="selectedChoice">
        <option v-for="element in choices" v-bind:key="element+Math.random()">
            {{ element }}
        </option>
      </select>  Value: {{ selectedChoice }}
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChoiceField',
  props: {
    function: { type: Function },
    objectLocalId: Number,
    tagLocalId: Number,
    variantLocalId: Number,
    input: String,
    property: String,
    value: String,
    choices: Array
  },
  watch: {
    selectedChoice: function (value) {
        this.function(this.objectLocalId, this.tagLocalId, this.variantLocalId, this.input, this.property, value)
    }
  },
  data() {
    return {
        selectedChoice: this.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div {
        color: white;
    }
</style>
