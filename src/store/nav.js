import axios from "axios"
export default {
	namespaced: true,
	actions: {
		async getNavInfo({ commit }) {
			axios.defaults.baseURL = 'http://localhost:5500'
			const res = await axios('/news/navs')
			commit('GETNAVINFO', res.data)
		},
		async getRecommendList({ commit }) {
			try {
				axios.defaults.timeout = 2000
				axios.defaults.baseURL = 'http://localhost:5500'
				const res = await axios({
					method: 'POST',
					url: '/news/recommend'
				})
				commit('GETRECOMMENDLIST', res.data)
			} catch (error) {
				console.log(error)
			}
		}
	},
	mutations: {
		GETNAVINFO(state, data) {
			state.navList = data
		},
		GETRECOMMENDLIST(state, data) {
			state.recommendList = data
		}
	},
	state: {
		navList: [],
		recommendList: []
	},
	getters: {}
}