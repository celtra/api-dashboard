import Vuex from 'vuex';
import Vue from 'vue';
import creatives from './modules/creatives';

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        creatives,
    }
});