//import axios from 'axios';

const state = {
    creatives: [
        {
            id: 1,
            title: "Creative one"
        },
        {
            id: 2,
            title: "Creative two"
        },
        {
            id: 3,
            title: "Creative three"
        },
    ]
};

const getters = {
    getCreatives: state => state.creatives
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}