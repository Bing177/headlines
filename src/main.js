import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// 按需引入
import {
	Input,
	Tabs,
	TabPane,
	Row,
	Col,
	Autocomplete,
	Button,
	Divider,
	Empty
} from 'element-ui'
//引入自定义主题样式
import './theme.scss'

Vue.component(Input.name, Input)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Button.name, Button)
Vue.component(Divider.name, Divider)
Vue.component(Empty.name, Empty)

Vue.use(VueRouter)

Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
