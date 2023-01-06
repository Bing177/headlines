import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// 按需引入
import {
	Autocomplete,
	Aside,
	Alert,
	Button,
	Backtop,
	Container,
	Col,
	Checkbox,
	Divider,
	Empty,
	Footer,
	Header,
	Input,
	Main,
	Row,
	Tabs,
	TabPane,
} from 'element-ui'
//引入自定义主题样式
import './theme.scss'

Vue.component(Input.name, Input)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Button.name, Button)
Vue.component(Divider.name, Divider)
Vue.component(Empty.name, Empty)
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Alert.name, Alert)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Backtop.name, Backtop)

Vue.use(VueRouter)

Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
}).$mount('#app')
