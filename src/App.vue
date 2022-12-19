<template>
	<div class="container">
		<!-- 头部区域 -->
		<Top />
		<el-divider></el-divider>
		<!-- 导航栏 -->
		<Navigator />
		<!-- 展示区 -->
	</div>
</template>

<script>
	import Top from './components/Top'
	import Navigator from './components/Navigator'
	export default {
		name: 'App',
		components: {
			Top,
			Navigator
		},
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
}
a:hover{
	color: #FA0206;
}
body{
	width: 70%;
	margin: 120px auto;
}
.container{
	padding:3px;
	.el-divider{
		margin-top: 120px;
	}
}
</style>
