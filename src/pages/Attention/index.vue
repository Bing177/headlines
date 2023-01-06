<template>
	<div class="login-status">
		<!-- 登录状态 -->
		<!-- <div v-if="username&&password" class="not-login">以登录</div> -->
		<div v-if="phone" class="not-login">已登录</div>
		<!-- 未登录状态 -->
		<div v-else class="not-login">
			<el-empty description="登录以后，可以查看你关注的作者精彩内容..." :image-size="50" image="https://s1.ax1x.com/2022/12/16/z7rSRU.png">
				<div class="info-1"><span>暂未登录</span></div>
			</el-empty>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Attention',
		data() {
			return {
				// username: '',
				// password:'',
				phone:''
			}
		},
		activated() {
			// this.username = localStorage.getItem('uname')
			// this.password = localStorage.getItem('upwd')
			this.phone = localStorage.getItem('phone')	
		},
		deactivated() {
		}	
	}
</script>

<style lang="less">
.login-status{
	.not-login{
		display: flex;
		flex-direction: column;
		height: 150px;
		justify-content: space-around;
		align-content: center;
		margin-top: 50px;
		.icon{
			height:40px;
			font-size: 40px;
			text-align: center;
		}
		.info-1{
			height: 30px;
			font-size: 20px;
			font-weight: 400;
			color:#222222;
			text-align: center;
		}
		.info-2{
			height: 10px;
			text-align: center;
			color:#B5B5B5;
		}
	}
}
</style>
