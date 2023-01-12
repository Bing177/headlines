import VueRouter from 'vue-router'
import Attention from '../pages/Attention'
import Recommend from '../pages/Recommend'
import Technology from '../pages/Technology'
import Hot from '../pages/Hot'
import International from '../pages/International'
import recreation from '../pages/Recreate'
import Cate from '../pages/Cate'
import Game from '../pages/Game'
import Login from '../pages/Login'
import User from '../pages/User'
//获取原型上的push方法
const originalPush = VueRouter.prototype.push
//修改原型上的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(e => e)
}
export default new VueRouter({
	mode: 'hash',
	routes: [
		{
			name: 'guanzhu',
			path: '/attention',
			component: Attention
		},
		{
			name: 'tuijian',
			path: '/recommend',
			component: Recommend
		},
		{
			name: 'keji',
			path: '/technology',
			component: Technology
		},
		{
			path: '/hot',
			component: Hot
		},
		{
			path: '/international',
			component: International
		},
		{
			path: '/recreation',
			component: recreation
		},

		{
			path: '/cate',
			component: Cate
		},
		{
			path: '/game',
			component: Game
		},
		{
			name: 'login',
			path: '/login',
			component: Login,
			children: [
				{
					name: 'user',
					path: 'user',
					component: User
				}
			]
		},
		{
			path: '*',
			redirect: {
				name: 'tuijian'
			}
		}
	]
})
