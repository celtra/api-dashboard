import axios from "axios";


const API = {
    me: "/me",
    accounts: "/accounts",
    creatives: "/creatives",
    folders: "/folders",
    adProductJobs: "/adProductJobs",
    adProductJob: "/adProductJob",
}

function API_URL(ENDPOINT) {
    return process.env.VUE_APP_CELTRA_URL + ENDPOINT
}


const state = {
    creatives: [],
    accountId: null,
    authToken: 'Basic ' + btoa(process.env.VUE_APP_CELTRA_APP_ID + ':' + process.env.VUE_APP_CELTRA_SECRET_KEY),
    creativeInfo: {},
    adProductJobId: null,
    folderId: null,
    destinationFolders: [],
    destinationFolder: null,
    ownerId: null,
};

const getters = {
    getCreatives: state => state.creatives,
    getCreativeInfo: state => state.creativeInfo,
    getAdProductJob: state => state.adProductJob,
    getFolderId: state => state.folderId,
    getDestinationFolders: state => state.destinationFolders,
    getDestinationFolder: state => state.destinationFolder,
    getOwnerId: state => state.ownerId,
};

const actions = {
    async fetchAdProductJobList({ commit, dispatch }) {
        if (state.ownerId == null) {
            await dispatch('fetchMe');
        }


        const config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'ownerId': state.ownerId,
            }
        };
        const listResponse = await axios.get(API_URL(API.adProductJobs), config);
        console.log(listResponse.data)

        return listResponse.data
    },

    async checkAdProductJobStatus({ commit }, adProductJobId) {
        var config = {
            headers: {
                'Authorization': state.authToken,
            },
        };
        const statusResponse = await axios.get(`${API_URL(API.adProductJob)}/${adProductJobId}`, config);
        console.log('AdProductJobStatus', statusResponse.data);

        return statusResponse?.data?.status
    },

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
        const creativeInfoResponse = await axios.get(API_URL(API.creatives), config);
        console.log('CreativeInfo', creativeInfoResponse.data[0]);
        commit('setCreativeInfo', creativeInfoResponse.data[0]);
    },

    async fetchDestinationFolders({ commit, dispatch }, parentFolderId) {
        console.log("parentId", parentFolderId)

        if (state.accountId == null) {
            await dispatch('fetchAccountId');
        }

        var params = {
            'accountId': state.accountId,
            'clazz': 'Campaign',
            'fields': ['id', 'name'].toString(),
        }

        if (parentFolderId ) {
            params = {
                'parentFolderId': parentFolderId,
                'accountId': state.accountId,
                'clazz':  ['Batch', 'SubFolder'].toString(),
                'fields': ['id', 'name'].toString(),
                'isDeleted': 0,
                'isArchived': 0,
            }
        }

        console.log("params", params)

        const config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: params
        };

        const destinationFoldersResponse = await axios.get(API_URL(API.folders), config);

        console.log('DestinationFolders', destinationFoldersResponse.data);
        commit('setDestinationFolders', destinationFoldersResponse.data);
    },

    async fetchMe({ commit }) {
        const me = await axios.get(API_URL(API.me), {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'fields': 'id',
            }
        });
        const ownerId = me.data.id;
        commit('setOwnerId', ownerId);

        return ownerId
    },

    async fetchAccountId({ commit, dispatch }) {
        if (state.ownerId == null) {
            await dispatch('fetchMe');
        }

        const config = {
            headers: {
                'Authorization': state.authToken,
            },
            params: {
                'userId': state.ownerId,
                'identifier': 'test3',
                'fields': 'id'
            }
        };
        const accountResponse = await axios.get(API_URL(API.accounts), config);
        const accountId = accountResponse.data[0].id;

        console.log('AccountId', accountId);
        commit('setAccountId', accountId);
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
        const creativesResponse = await axios.get(API_URL(API.creatives), creativesConfig);

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

        const foldersResponse = await axios.get(API_URL(API.folders), foldersConfig);

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
    },

    async fetchAdProductJob({ commit }, body) {
        const headers = {
            'Authorization': state.authToken,
            'Access-Control-Allow-Headers': '*',
            'Accept': '*/*',
            'Content-Type': 'application/json; charset=UTF-8',
        }
        const config = {
            headers: headers
        };
        const responseApProductJobs = await axios.post(API_URL(API.adProductJobs), body, config);

        console.log('adProductJob', responseApProductJobs);
        commit('setAdProductJobId', responseApProductJobs.data.adProductJobId);

        return responseApProductJobs.data.adProductJobId
    },

    saveFolderId({ commit, dispatch }, folderId) {
        commit('setFolderId', folderId);
    }
};

const mutations = {
    setCreatives: (state, creatives) => state.creatives = creatives,
    setAccountId: (state, id) => state.accountId = id,
    setCreativeInfo: (state, creativeInfo) => state.creativeInfo = creativeInfo,
    setAdProductJobId: (state, adProductJobId) => state.adProductJobId = adProductJobId,
    setFolderId: (state, folderId) => state.folderId = folderId,
    setDestinationFolders: (state, destinationFolders) => state.destinationFolders = destinationFolders,
    setDestinationFolder: (state, destinationFolder) => state.destinationFolder = destinationFolder,
    setOwnerId: (state, ownerId) => state.ownerId = ownerId,
};

export default {
    state,
    getters,
    actions,
    mutations,
}