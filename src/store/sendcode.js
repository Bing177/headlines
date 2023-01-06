import axios from "axios"
export default {
    namespaced: true,
    actions: {
        async getCode({ commit }, data) {
            axios.defaults.baseURL = 'http://localhost:5500'
            axios.defaults.timeout = 3000
            try {
                const res = await axios({
                    method: 'GET',
                    url: '/news/login/getcode',
                    params: { codeLength: data },
                })
                commit('GETCODE', res.data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mutations: {
        GETCODE(state, data) {
            state.verificationcode = data
        }
    },
    state: {
        verificationcode: ''
    },
    getters: {}
}