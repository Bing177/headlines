import VueRouter from 'vue-router'
import Attention from '../pages/Attention'
import Recommend from '../pages/Recommend'
import Hot from '../pages/Hot'
import Recreate from '../pages/Recreate'
import Military from '../pages/Military'
import Educate from '../pages/Educate'
import Sport from '../pages/Sport'
//获取原型上的push方法
const originalPush = VueRouter.prototype.push
//修改原型上的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(e => e)
}
export default new VueRouter({
	routes: [
		{
			path: '/attent',
			component: Attention
		},
		{
			name: 'tuijian',
			path: '/recommend',
			component: Recommend
		},
		{
			path: '/hot',
			component: Hot
		},
		{
			path: '/recreate',
			component: Recreate
		}, {
			path: '/military',
			component: Military
		}, {
			path: '/educate',
			component: Educate
		},
		{
			path: '/sport',
			component: Sport
		},
		{
			path: '*',
			redirect: {
				name: 'tuijian'
			}
		}
	]
})
