<template>
  <div>
      <div v-if="property == 'fontLocalId'">
        <input type="text" v-model="fontValue" placeholder="Type">
        <br>
        {{ fontValue }}
      </div>
      <div v-else>
        <input type="text" v-model="stringValue" placeholder="Type">
        <br>
        {{ stringValue }}
      </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InputField',
  props: {
    function: { type: Function },
    objectLocalId: Number,
    tagLocalId: Number,
    variantLocalId: Number,
    property: String,
    input: String,
    value: String
  },
  watch: {
    stringValue: function (value) {
      this.function(this.objectLocalId, this.tagLocalId, this.variantLocalId, this.input, this.property, value)
    },
    fontValue: function (value) {
      this.function(this.objectLocalId, this.tagLocalId, this.variantLocalId, this.input, this.property, value)
    }
  },
  data() {
    return {
      stringValue: this.value,
      fontValue: this.value
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
