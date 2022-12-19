<template>
	<div class="nav-bar">
		<!-- 导航栏左侧 -->
		<el-tabs  v-model="activeName" @tab-click="handleClick">
			<el-tab-pane 
			v-for="n of navList" 
			:key="n.id" 
			:label="n.title" 
			:name="n.number"
			:path="n.path"
			:content="n.content"
			>
				<keep-alive include="Attention,Recommend">
					<router-view></router-view>
				</keep-alive>
			</el-tab-pane>
  		</el-tabs>
		<!-- 导航栏右侧 -->
		<div class="nav-right">
			<!-- 登录区域 -->
			<div class="login-region">
				<div style="text-align:center;color:#B5B5B5;font-size:18px;" >登录后，头条更懂你</div>
				<div style="text-align:center;color:#B5B5B5;font-size:18px;">内容更有趣</div>
				<el-button type="danger">立即登录</el-button>
			</div>
			<!-- 头条热榜 -->
			<div class="top-search">
				<div class="top-search-head">
					<div class="log">
						<img src="https://s1.ax1x.com/2022/12/16/z7rHfK.png" style="width:24px;vertical-align:middle;margin-top:-5px;">
						<span style="font-size:18px;font-weight:400;padding-left:10px;">头条热榜</span>
					</div>
					<div class="refresh">
						<el-button @click="addAmimate" type="text" style="margin-top:-10px;">
							<transition><img :class="addStyle" src="https://s1.ax1x.com/2022/12/16/z7ssnH.png" style="width:20px;vertical-align:middle;"/></transition>
							<span>换一换</span>
						</el-button>
					</div>
					
				</div>
				<div class="top-search-content">
					<ol>
						<li v-for="h of hotsearch" :key="h.id">
							<router-link to="/abc">
								<span></span>&nbsp;&nbsp;
								{{h.title}}
							</router-link>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: 'NewsNavigator',
		data() {
			return {
				activeName: 'second',
				addStyle: '',
				page: 0,
				pageSize:10
			}
		},
		computed: {
			...mapState('nav', ['navList']),
			...mapState('hotsearch',['hotsearch'])
		},
		methods: {
			handleClick({ $attrs }, e) {
				e.target.style.fontSize = 22 + 'px'
				this.$router.push({
					path: $attrs.path,
					query: {
						content: $attrs.content,
					}
				})
			},
			addAmimate() {
				//1.添加样式
				this.addStyle = 'rotate'
				setTimeout(() => {
					this.addStyle = ''
				}, 550)
				//2.发送请求
				this.$store.dispatch('hotsearch/getHotSearch',{page:this.page++,pageSize:this.pageSize})
			},
			
		},
		mounted() {
			this.$store.dispatch('nav/getNavInfo')
			this.$store.dispatch('hotsearch/getHotSearch',{page:0,pageSize:10})
		}
	}
</script>
<style lang="less" scoped>
@keyframes refresh {
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(135deg);
	}
}
/* 用于点击后添加的样式 */
.rotate{
	animation: refresh 300ms linear;
	transition: all 0.3s;
}
.nav-bar{
	display: flex ;
	flex-direction: row;
	justify-content:space-between;
	margin-top: 50px;
	.el-tabs{
		flex: 2;
		height: 50px;
	}
	.nav-right{
		display:flex;
		flex:1;
		flex-direction:column;
		.login-region{
			align-content: center;
			margin-top: 50px;
			.el-button{
				background-color:#FA0206;
				margin-left:125px;
				margin-top: 20px;
			}
			.el-button:hover{
				background-color: #F15455;
			}
		}
		.top-search{
			margin-top:30px;
			.top-search-head{
				display:flex;
				margin:0;
				padding:3px;
				height:30px;
				.log{
					float: left;
					width: 220px;
					height: 25px;
					margin-left: 2px;
				}
				.refresh{
					float: right;
					width: 80px;
					height: 25px;
				}
			}
			.top-search-content{
				ol{
					display:flex;
					flex-direction: column;
					margin-left: 0px;
					:nth-child(1){
						a{
							span{
								background: url(https://s1.ax1x.com/2022/12/18/zbLkJP.png) no-repeat;
							}
						}
						
					}
					:nth-child(2){
						a{
							span{
								background:url(../../assets/1.png) no-repeat;
							}
						}
					}
					:nth-child(3){
						a{
							span{
								background:url(../../assets/2.png) no-repeat;
							}
						}
					}
					:nth-child(4){
						a{
							span{
								background:url(../../assets/3.png) no-repeat;
							}
						}
					}
					:nth-child(5){
						a{
							span{
								background:url(../../assets/4.png) no-repeat;
							}
						}
					}
					:nth-child(6){
						a{
							span{
								background:url(../../assets/5.png) no-repeat;
							}
						}
					}
					:nth-child(7){
						a{
							span{
								background:url(../../assets/6.png) no-repeat;
							}
						}
					}
					:nth-child(8){
						a{
							span{
								background:url(../../assets/7.png) no-repeat;
							}
						}
					}
					:nth-child(9){
						a{
							span{
								background:url(../../assets/8.png) no-repeat;
							}
						}
					}
					:nth-child(10){
						a{
							span{
								background:url(../../assets/9.png) no-repeat;
							}
						}
					}
					li{
						height: 50px;
						font-size: 16px;
						font-weight: 350;
						line-height: 45px;
						padding: 5px;
						span{
							display:inline-block;
							width:25px;
							height:25px;
							vertical-align:middle;
						}
					}
				}
			}
		}
	}
}
</style>