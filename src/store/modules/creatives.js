import axios from "axios";

const state = {
    creatives: [
        /*
        {
            folderId: "23432szd",
            folderName: "ThisIsFolder",
            creatives: [
                {
                    id: 1,
                    name: "Creative one",
                    folderId: '23432szd',
                    clazz: 'Test banner'
                },
                {
                    id: 2,
                    name: "Creative two",
                    folderId: '23432szd',
                    clazz: 'Test banner'
                },
                {
                    id: 3,
                    name: "Creative three",
                    folderId: '23432szd',
                    clazz: 'Test banner'
                },
            ]
        },
        {
            folderId: "53rfds43",
            folderName: "SecondFolder",
            creatives: [
                {
                    id: 4,
                    name: "CreativeFour",
                    folderId: '53rfds43',
                    clazz: 'Test banner'
                },
            ]
        },
        */

    ],
    accountId: '01feb88d',
    authToken: 'Basic ' + btoa(process.env.VUE_APP_CELTRA_APP_ID + ':' + process.env.VUE_APP_CELTRA_SECRET_KEY),
};

const getters = {
    getCreatives: state => state.creatives
};

const actions = {
    async fetchAccountId({ commit }) {
        const URL = process.env.VUE_APP_CELTRA_URL + "/accounts";

        var config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'userId': 'me',
            }
        };
        const response = await axios.get(URL, config);

        console.log('AccountId', response.data);
        commit('setAccountId', response.data.id);
    },

    async fetchFolders({ commit }) {
        const URL = process.env.VUE_APP_CELTRA_URL + "/folders";

        var config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'accountId': state.accountId,
                'clazz': 'Template',
                'fields': ['id', 'name'],
                'in': []
            }
        };
        const response = await axios.get(URL, config);

        console.log('AccountId', response.data);
        commit('setAccountId', response.data.id);
    },

    async fetchCreatives({ commit, dispatch }) {
        /*
        if (state.accountId == null) {
            await dispatch('fetchAccountId');
        }
        */
        const headers = {
            'Authorization': state.authToken,
        }
        const creativesConfig = {
            headers: headers,
            params: {
                'accountId': state.accountId,
                'folderClazz': 'Template',
                'fields': ['id', 'name', 'clazz', 'folderId'].toString(),
            }
        };
        const creativesResponse = await axios.get(process.env.VUE_APP_CELTRA_URL + "/creatives", creativesConfig);

        const folders = creativesResponse.data.map(c => c.folderId)

        const foldersConfig = {
            headers: headers,
            params: {
                'accountId': state.accountId,
                'clazz': 'Template',
                'fields': ['id', 'name'].toString(),
                'in': folders.toString(),
            }
        };

        const foldersResponse = await axios.get(process.env.VUE_APP_CELTRA_URL + "/folders", foldersConfig);

        const mappedCreatives = [];
        for (var folder of foldersResponse.data) {
            mappedCreatives.push({
                folderId: folder.id,
                folderName: folder.name,
                creatives: creativesResponse.data.filter(creative => creative.folderId == folder.id)
            });
        }
        console.log('MappedCreatives', mappedCreatives);
        commit('setCreatives', mappedCreatives);
    }
};

const mutations = {
    setCreatives: (state, creatives) => state.creatives = creatives,
    setAccountId: (state, id) => state.accountId = id,
};

export default {
    state,
    getters,
    actions,
    mutations
}