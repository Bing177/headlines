<template>
	<div class="nav-bar">
		<!-- 导航栏左侧 -->
		<el-tabs  v-model="activeName" @tab-click="handleClick">
			<el-tab-pane 
			v-for="n of navList" 
			:key="n.id" 
			:label="n.title" 
			:name="n.sequence"
			:path="n.path"
			:content="n.content"
			>
				<keep-alive include="Attention,Recommend,Technology,Hot,International,Recreation,Cate,Game">
					<router-view></router-view>
				</keep-alive>
			</el-tab-pane>
  		</el-tabs>
		<!-- 导航栏右侧 -->
		<div class="nav-right">
			<el-button v-if="false" :plain="true" @click="isLogin"></el-button>
			<!-- 未登录状态 -->
			<div v-if="!status" class="login-region">
				<div style="text-align:center;color:#B5B5B5;font-size:18px;margin-top:20%;padding:10px 0;" >登录后，头条更懂你</div>
				<div style="text-align:center;color:#B5B5B5;font-size:18px;padding:10px 0;">内容更有趣</div>
				<el-button @click="toLogin" type="danger">立即登录/注册</el-button>
			</div>
			<!-- 已登录状态 -->
			<div v-else class="login-region">
				<!-- 登录状态内容 -->
				<div class="login-content">
					<!-- 用户昵称 -->
					<div class="user user-name">
						<router-link to="/login/user">
							<img :src="avatar" />
							<h3 style="">{{nickname}} ></h3>
						</router-link>
					</div>
					<!-- 用户魅力 -->
					<ul class="user user-charm">
						<li>
							<router-link to="/login/user">
								<h2>{{praise}}</h2>
								<p>获赞</p>
							</router-link>
						</li>
						<li>
							<router-link to="/login/user">
								<h2>{{fan}}</h2>
								<p>粉丝</p>
							</router-link>
						</li>
						<li>
							<router-link to="/login/user">
								<h2>{{attention}}</h2>
								<p>关注</p>
							</router-link>
						</li>
					</ul>
					<!-- 用户操作 -->
					<ul class="user user-operate">
						<li>
							<router-link to="/login/user">
								<img src="../../assets/title.jpg" />
								<p>写文章</p>
							</router-link>
						</li>
						<li>
							<router-link to="/login/user">
								<img src="../../assets/headline.jpg" style="margin-left:8px;"/>
								<p>发微头条</p>
							</router-link>
						</li><li>
							<router-link to="/login/user">
								<img src="../../assets/replay.jpg" />
								<p>写回答</p>
							</router-link>
						</li><li>
							<router-link to="/login/user">
								<img src="../../assets/video.jpg" />
								<p>发视频</p>
							</router-link>
						</li>
					</ul>
				</div>
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
							<router-link to="/abc" style="text-align:left !important;">
								<span></span>&nbsp;&nbsp;
								<h4 style="display:inline;font-weight:400; vertical-align:middle;margin-left:-10px;">{{h.title}}</h4>
								<img v-if="h.hot===1" src="../../assets/hot.png"/>
								<img v-else-if="h.latest===1" src="../../assets/latest.png" />
							</router-link>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import _ from 'lodash'
	export default {
		name: 'NewsNavigator',
		data() {
			return {
				activeName: 'second',
				addStyle: '',
				gotop:'',
				page: 0,
				pageSize: 10,
				status:false,//登录状态 
				phone: null,
				nickname: null,
				praise: 0,
				fan: 0,
				attention:0
			}
		},
		computed: {
			...mapState('nav', ['navList','avatar']),
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
				this.$store.dispatch('hotsearch/getHotSearch',
					{ page: ++this.page, pageSize: this.pageSize }
				)
			},
			toLogin() {
				scrollTo(0,0)
				this.$bus.$emit('sendFlg',true)//与App组件通信
				this.$router.push({
					name:'login'
				})
				
			},
			isLogin() {
        		Message({
          			showClose: true,
          			message: 'Token认证失效，请重新登录！',
          			type: 'warning'
        		});
			},
			getUserStaus: _.debounce(async function () {
				try {
					const res = await this.$axios.get('/news/get/user', {
						headers: {
							'Authorization': localStorage.getItem('token')
						}
					})
					this.nickname = res.data.info.nickname
					this.$store.dispatch('nav/getAvatar')
					this.status = true
					const res2 = await this.$axios.get('/news/api/user/charm')
					const [{ praise, fan, attention }] = res2.data
					this.praise = praise
					this.fan = fan
					this.attention = attention
				} catch (error) {
					this.isLogin()
					return error
				}
			})
		},
		mounted() {
			this.$store.dispatch('nav/getNavInfo')
			this.$store.dispatch('hotsearch/getHotSearch', { page: 0, pageSize: 10 })
			this.$axios.defaults.baseURL = 'http://localhost:5500'
			// this.phone = localStorage.getItem('phone')
			// this.nickname = localStorage.getItem('nickname')
			// 判断登录状态
			/* if (this.phone && this.nickname) { // 已登录
				this.$store.dispatch('nav/getAvatar')
				this.$axios.get('http://localhost:5500/news/api/user/charm').then(v => {
					const [{praise,fan,attention}] = v.data
					this.praise = praise
					this.fan = fan,
					this.attention = attention
				}).catch(e=>{console.log(e)})
			} */
			// 判断用户登录状态
			this.getUserStaus()
		},
		updated() {
			this.getUserStaus()
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
		margin:5px;
		.login-region{
			height: 250px;
			.el-button{
				background-color:#FA0206;
				width: 70%;
				align-self: center;
				margin-left: 50px;
			}
			.el-button:hover{
				background-color: #F15455;
			}
			.login-content{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-content: center;
				padding:5px;
				height: 100%;
				background-color:#fafafa;
				.user{
					a{
						&:hover{
							color: #000;
						}
					}
				}
				.user-name{
					height:50px;
					a{
						display: inline-block;
						position: relative;
						height: 100%;
						padding: 0 10px;
						img{
							position: relative;;
							width: 30px;
							height: 30px;
							top: 50%;
							transform: translate(0,-50%);
							border-radius: 50%;
						}
						h3{
							display:inline-block;
							vertical-align:middle;
							padding-left:10px;
							font-size:x-large;
						}
					}
				}
				.user-charm{
					display: flex;
					justify-content: space-around;
					align-items: center;
					height: 60px;
					li{
						width: 60px;
						height: 100%;
						position: relative;
						a{
							position: relative;
							left: 50%;
							top:50%;
							display: inline-block;
							height: 50px;
							padding: 5px;
							transform: translate(-50%,-50%);
							h2{
								text-align: center;
							}
						}
					}
				}
				.user-operate{
					display: flex;
					justify-content: space-around;
					align-items: center;
					height:100px;
					li{
						position: relative;
						width: 100%;
						height: 100%;
						padding:0 10px;
						a{
							display: inline-block;
							position: relative;
							left: 50%;
							top: 50%;
							width:65px;
							height: 70px;
							transform: translate(-50%,-50%);
							img{
								position: relative;
								width: 44px;
								height: 44px;
							}
							p{
								position: relative;
							}
						}
					}
				}
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
						a{
							img{
								width:20px;height:20px;
							}
						}
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