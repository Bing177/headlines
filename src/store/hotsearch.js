import axios from "axios"
export default {
    namespaced: true,
    actions: {
        async getHotSearch({ commit }, playload) {

            try {
                const res = await axios({
                    method: 'POST',
                    url: 'http://localhost:5500/news/hotsearch',
                    // params: { page: playload.page, pageSize: playload.pageSize },//query参数
                    data: { page: playload.page, pageSize: playload.pageSize },//JSON格式
                    timeout: 3000
                })
                commit('GETHOTSEARCH', res.data)
            } catch (error) {
                console.log(error)
            }
        },
    },
    mutations: {
        GETHOTSEARCH(state, data) {
            state.hotsearch = data
        }
    },
    state: { hotsearch: [] },
    getters: {}
}