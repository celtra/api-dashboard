import axios from "axios";

const state = {
    creatives: [
        /*
        {
            id: 1,
            name: "Creative one",
            folderId: 'Test',
            clazz: 'Test banner'
        },
        {
            id: 2,
            name: "Creative two",
            folderId: 'Test',
            clazz: 'Test banner'
        },
        {
            id: 3,
            name: "Creative three",
            folderId: 'Test',
            clazz: 'Test banner'
        },
        */
    ]
};

const getters = {
    getCreatives: state => state.creatives
};

const actions = {
    async fetchCreatives({ commit }) {
        const URL = process.env.VUE_APP_CELTRA_URL + "/creatives";

        var username = process.env.VUE_APP_CELTRA_APP_ID;
        var password = process.env.VUE_APP_CELTRA_SECRET_KEY;
        var basicAuth = 'Basic ' + btoa(username + ':' + password);

        var config = {
            headers: {
                'Authorization': basicAuth,
            },
            params: {
                'accountId': '01feb88d',
                'folderClazz': 'Template',
            }
        };
        const response = await axios.get(URL, config);

        console.log('Creatives', response.data);
        commit('setCreatives', response.data);
    }
};

const mutations = {
    setCreatives: (state, creatives) => state.creatives = creatives
};

export default {
    state,
    getters,
    actions,
    mutations
}