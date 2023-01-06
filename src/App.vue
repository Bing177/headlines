<template>
	<div class="container">
		<!-- 头部区域 -->
		<Top />
		<el-divider></el-divider>
		<!-- 导航栏 -->
		<Navigator />
		<!-- 展示区 -->
		<!-- 工具栏 -->
		<Toolbar/>
		<!-- 登录页面 -->
		<keep-alive include="Login" v-if="flg">
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import Top from './components/Top'
	import Navigator from './components/Navigator'
	import Toolbar from './components/Toolbar'
	export default {
		name: 'App',
		data() {
			return {
				flg:false
			}
		},
		components: {
			Top,
			Navigator,
			Toolbar,
		},
		methods: {
			getFlg(data) {
				this.flg = data
			}
		},
		mounted() {
			this.$bus.$on('sendFlg', this.getFlg)//与Navigator组件通信
			this.$bus.$on('logout',this.getFlg)	// 与Login路由组件通信
		}
	}
</script>

<style lang="less">
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
li{
	list-style: none;
}
a{
	text-decoration: none;
	color: black;
	img{
		overflow: hidden;
		transition: all .2s linear;
		&:hover{
			transform: scale(1.1);
		}
	}
}
a:hover{
	color: #FA0206;
}
body{
	width: 70%;
	margin: 120px auto;
	// height: calc(360px + 1850px);
}
.container{
	padding:3px;
	height: inherit;
	.el-divider{
		margin-top: 120px;
	}
}
input:focus{
    outline: none;
	border: -1px solid;
    border-color: #d8dce4 !important;
}
</style>
