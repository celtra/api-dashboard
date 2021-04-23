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
    accountId: null,
    authToken: 'Basic ' + btoa(process.env.VUE_APP_CELTRA_APP_ID + ':' + process.env.VUE_APP_CELTRA_SECRET_KEY),
    creativeInfo: {},
};

const getters = {
    getCreatives: state => state.creatives,
    getCreativeInfo: state => state.creativeInfo,
};

const actions = {
    async fetchCreativeInfo({ commit }, creativeId) {
        var config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'isArchived': '0',
                'isEffectivelyArchived': '0',
                'returnPartialUnits': '1',
                'fields': [
                    'id',
                    'name',
                    'clazz',
                    'template',
                    'schemaVersion',
                    'builderCreativeVersion',
                    'units',
                    'files',
                    'hasVideoContent',
                    'customAttributes'
                ].toString(),
                'id.in': creativeId,
            }
        };
        const creativeInfoResponse = await axios.get(process.env.VUE_APP_CELTRA_URL + "/creatives", config);
        console.log('CreativeInfo', creativeInfoResponse.data);
        commit('setCreativeInfo', creativeInfoResponse.data);
    },

    async fetchAccountId({ commit }) {
        const me = await axios.get(process.env.VUE_APP_CELTRA_URL + "/me", {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'fields': 'id',
            }
        });
        const ownerId = me.data.id;

        var config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'userId': ownerId,
                'identifier': 'test3',
                'fields': 'id'
            }
        };
        const accountResponse = await axios.get(process.env.VUE_APP_CELTRA_URL + "/accounts", config);
        const accountId = accountResponse.data[0].id;

        console.log('AccountId', accountId);
        commit('setAccountId', accountId);
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
                'fields': ['id', 'name'].toString(),
                'in': []
            }
        };
        const response = await axios.get(URL, config);

        console.log('AccountId', response.data);
        commit('setAccountId', response.data.id);
    },

    async fetchCreatives({ commit, dispatch }) {
        if (state.accountId == null) {
            await dispatch('fetchAccountId');
        }

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
    setCreativeInfo: (state, creativeInfo) => state.creativeInfo = creativeInfo,
};

export default {
    state,
    getters,
    actions,
    mutations
}