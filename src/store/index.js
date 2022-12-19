import Vue from 'vue'
import Vuex from 'vuex'
import nav from './nav'
import hotsearch from './hotsearch'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		nav,
		hotsearch
	}
})
