import axios from "axios"
export default {
	namespaced: true,
	actions: {
		//获取用户头像
		async getAvatar({ commit }) {
			try {
				const res = await axios.get('http://localhost:5500/news/user/avatar')
				commit('GETAVATAR', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取导航栏标题
		async getNavInfo({ commit }) {
			axios.defaults.baseURL = 'http://localhost:5500'
			const res = await axios('/news/navs')
			commit('GETNAVINFO', res.data)
		},
		// 获取推荐
		async getRecommend({ commit }) {
			try {
				axios.defaults.timeout = 3000
				axios.defaults.baseURL = 'http://localhost:5500'
				const res = await axios({
					method: 'POST',
					url: '/news/recommend'
				})
				commit('GETRECOMMEND', res.data)
				return res.data
			} catch (error) {
				console.log(error)
				// return error
			}
		},
		// 获取科技
		async getTechnology({ commit }) {
			try {
				axios.defaults.baseURL = 'http://localhost:5500'
				const res = await axios.post('/news/technology')
				commit('GETTECHNOLOGY', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取热点
		async getHot({ commit }) {
			try {
				axios.defaults.timeout = 3000
				axios.defaults.baseURL = 'http://localhost:5500'
				const res = await axios({
					method: 'POST',
					url: '/news/hot'
				})
				commit('GETHOT', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取国际
		async getInternational({ commit }) {
			try {
				const res = await axios.post('http://localhost:5500/news/international')
				commit('GETINTERNATIONAL', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取娱乐
		async getRecreation({ commit }) {
			try {
				const res = await axios.post('http://localhost:5500/news/recreation')
				commit('GETRECREATE', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取美食
		async getCate({ commit }) {
			try {
				const res = await axios.post('http://localhost:5500/news/cate')
				commit('GETCATE', res.data)
			} catch (error) {
				console.log(error)
			}
		},
		// 获取游戏
		async getGame({ commit }) {
			try {
				const res = await axios.post('http://localhost:5500/news/game')
				commit('GETGAME', res.data)
			} catch (error) {
				console.log(error)
			}
		}
	},
	mutations: {
		GETAVATAR(state, data) { state.avatar = data },
		GETNAVINFO(state, data) { state.navList = data },
		GETRECOMMEND(state, data) { state.recommendList = data },
		GETTECHNOLOGY(state, data) { state.technologyList = data },
		GETHOT(state, data) { state.hotList = data },
		GETINTERNATIONAL(state, data) { state.internationalList = data },
		GETRECREATE(state, data) { state.recreationList = data },
		GETCATE(state, data) { state.cateList = data },
		GETGAME(state, data) { state.gameList = data }
	},
	state: {
		avatar: '',
		navList: [],
		recommendList: [],
		technologyList: [],
		hotList: [],
		internationalList: [],
		recreationList: [],
		cateList: [],
		gameList: []
	},
	getters: {}
}