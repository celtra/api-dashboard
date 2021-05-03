<template>
  <div>
      <div v-if="getCreativeInfo.template">
          <div v-if="getCreativeInfo.template.templateObjects.length == 0">
            This creative does not have any template objects.
          </div>
          <div v-else>
            <div  v-for="creativeInfo in getCreativeInfo.template.templateObjects" v-bind:key="creativeInfo.tagLocalId + creativeInfo.objectLocalId">
              <div v-if="creativeInfo.properties.length > 0">
                  <hr>
                  <div  v-for="property in creativeInfo.properties" v-bind:key="property.label + Math.random()">
                    <div class="label-title">
                      {{ property.label }}
                    </div>

                    <div v-if="property.type == 'string' || property.type == 'color' || property.type == 'font'">
                      <InputField
                        v-bind:function="updateTemplateValue"
                        :objectLocalId="creativeInfo.objectLocalId"
                        :tagLocalId="creativeInfo.tagLocalId"
                        :variantLocalId="creativeInfo.variantLocalId"
                        :input="property.input"
                        :property="property.property"
                        :value="JSON.stringify(property.value)" />
                    </div>

                    <div v-if="property.type == 'image'">
                      {{ property }}
                    </div>
                    <div v-if="property.type == 'choice'">
                      <ChoiceField
                        v-bind:function="updateTemplateValue"
                        :objectLocalId="creativeInfo.objectLocalId"
                        :tagLocalId="creativeInfo.tagLocalId"
                        :variantLocalId="creativeInfo.variantLocalId"
                        :input="property.input"
                        :property="property.property"
                        :value="property.value"
                        :choices="property.enum" />
                    </div>

                  </div>
              </div>
            </div>
            <button v-on:click="createCreativeFromTemplate()" class="create-btn">Create Creative</button>
          </div>
      </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
import InputField from '@/components/InputField.vue';
import ChoiceField from '@/components/ChoiceField.vue';

export default {
  name: 'CreativeInfo',
  components: {
    InputField,
    ChoiceField
  },
  methods: {
    ...mapActions([
      'fetchCreativeInfo',
      'fetchAdProductJob',
    ]),

    createCreativeFromTemplate() {
      console.log("Creating creative...");

      const newTemplate = {
        destinationFolderId: "08016225", //this.getFolderId,
        template: {
          name: "TestTestTestTest", // ima kreative
          creativeSchemaVersion: this.getCreativeInfo.schemaVersion,
          creativeCustomAttributes: {},
          outputInstances: "groupByClazz", // "groupByClazz"
          templateId: this.id,
          outputs: [ // vsak element je en size
            {
              isDecoupled: false, // ??????
              preferredVariantLocalId: 2, // primer 2
              size: {
                width: 320, // primer 320
                height: 460 // primer 460
              },
              templateObjects: this.templateObjects
            }
          ]
        }
      }
      console.log(newTemplate)
      this.fetchAdProductJob(newTemplate);
    },

    updateTemplateValue(objectLocalId, tagLocalId, variantLocalId, input, property, value) {
      const newProperty = {
        input: input,
        property: property,
        value: value
      }
      const index  = this.templateObjects.findIndex(el => {
        if (el.objectLocalId && el.tagLocalId && el.variantLocalId) {
          return el.objectLocalId == objectLocalId &&
                 el.tagLocalId == tagLocalId &&
                 el.variantLocalId == variantLocalId
        }
        return false
      })
      if (index >= 0) {
        const indexOfPropery = this.templateObjects[index].properties.findIndex(el => {
          return el.input == input && el.property == property
        })
        if (indexOfPropery >= 0) {
          this.templateObjects[index].properties[indexOfPropery].value = value
        }
        else {
          this.templateObjects[index].properties.push(newProperty)
        }
      }
      else {
        this.templateObjects.push({
          creativeId: this.id,
          objectLocalId: objectLocalId,
          tagLocalId: tagLocalId,
          variantLocalId: variantLocalId,
          properties: [newProperty]
        })
      }
      console.log(this.templateObjects)
    }
  },
  computed: mapGetters([
    'getCreativeInfo',
    'getFolderId',
  ]),

  created() {
    this.fetchCreativeInfo(this.id);
    console.log(this.$route);
  },
  props: {
      id: String,
      folderId: String,
  },
  data() {
    return {
      templateObjects: [
        /*
        {
          creativeId: "", // primer "c30ea2b2",
          objectLocalId: null, // primer 25
          tagLocalId: null, // primer 48
          variantLocalId: null, // primer 2
          properties: [
            {
              input: "", // primer "user"
              property: "", // primer "text"
              value: "", // primer "nek nov value"
            },
            {
              input: "", // primer "user"
              property: "", // primer "textColor"
              value: "", // primer "rgb(52,101,71)"
            }
          ]
        }
        */
      ]
    }
  }
}

// Final step
// https://hub.mab.anze.tanko.test/api/creatives?fields=id&accountId=01feb88d&folderId=08016225&name=nova2
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div {
        color: white;
    }

    .label-title {
      font-size: 30px;
      color: red;
    }

    .create-btn:hover {
      opacity: 0.6;
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
