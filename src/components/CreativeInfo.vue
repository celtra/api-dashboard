<template>
  <div>
      <div v-if="pickDestinationFolder">
        <DestinationFolder v-bind:function="requestAdProductJobId"/>
      </div>
      <div v-else>
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
                          :value="property.type == 'font' ? property.value.typefaceId : property.value" />
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
              <hr>
              <div class="label-title">
                  Creative name
              </div>
              <div>
                <input type="text" v-model="creativeName" placeholder="Creative name">
              </div>
              <button v-on:click="proceedToDestinationFolders()" class="create-btn">Next</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
import InputField from '@/components/templateFields/InputField.vue';
import ChoiceField from '@/components/templateFields/ChoiceField.vue';
import DestinationFolder from '@/components/DestinationFolder.vue';

export default {
  name: 'CreativeInfo',
  components: {
    InputField,
    ChoiceField,
    DestinationFolder,
  },
  methods: {
    ...mapActions([
      'fetchCreativeInfo',
      'fetchAdProductJob',
    ]),

    proceedToDestinationFolders() {
      this.pickDestinationFolder = true;
    },

    requestAdProductJobId(destinationFolder) {
      console.log("Creating creative...");

      const newTemplate = {
        destinationFolderId: destinationFolder,
        template: {
          name: this.creativeName,
          creativeSchemaVersion: this.getCreativeInfo.schemaVersion,
          creativeCustomAttributes: {},
          outputInstances: "groupByClazz", // "groupByClazz"
          templateId: this.id,
          outputs: [
            {
              isDecoupled: false,
              preferredVariantLocalId: 2,
              size: {
                width: 320, // 320
                height: 460, // 460
              },
              templateObjects: this.templateObjects
            }
          ]
        }
      }
      console.log(newTemplate)
      this.fetchAdProductJob(newTemplate).then(adProductJobId => {
        this.$router.push({ path: `/status/${adProductJobId}`})
      });
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
    'getAdProductJob',
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
      templateObjects: [],
      creativeName: "creativeName",
      destinationFolderId: null,
      pickDestinationFolder: false,
    }
  }
}

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

<!--
  {
    creativeId: "",
    objectLocalId: null,
    tagLocalId: null,
    variantLocalId: null,
    properties: [
      {
        input: "", // "user"
        property: "", // "text"
        value: "", // "newValue"
      },
      {
        input: "", // "user"
        property: "", // "textColor"
        value: "", // "rgb(52,101,71)"
      }
    ]
  }
-->
