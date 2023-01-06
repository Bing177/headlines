import Vue from 'vue'
import Vuex from 'vuex'
import nav from './nav'
import hotsearch from './hotsearch'
import sendcode from './sendcode'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		nav,
		hotsearch,
		sendcode,
	}
})
