<template>
	<div class="container">
		<el-row v-for="r of recommendList" :key="r.id" :flg="r.flg">
  			<el-col :span="24">
				<div class="grid-content" >
					<router-link to="/abc">
						<span style="font-size:20px;">{{r.title}}</span>
					</router-link>
					<div class="banner" v-if="r.img_url">
						<router-link to="/abc"><img v-if="r.img_url" :src="r.img_url" style="width:160px;"/></router-link>
					</div>
					<div class="footer">
						<span v-show="r.operation" style="color:#FA0206;">{{r.operation}}</span>
						<router-link to="/abc">
							<span v-if="r.publisher">{{r.publisher}}</span>
						</router-link>
						<router-link to="/abc">
							<span v-if="r.type">{{r.type}}</span>
						</router-link>
						<router-link to="/abc">
							<span v-if="r.comment">{{r.comment}}</span>
						</router-link>
						<span v-if="r.timeout">{{r.timeout}}</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	name: 'Recommend',
	computed: {
		...mapState('nav',['recommendList'])
	},
	activated() {
		// console.log('进入recommend页面')
		this.$store.dispatch('nav/getRecommendList')
	},
	deactivated() {
		// console.log('离开recommend页面')
	}
}
</script>

<style scoped lang="less">
.container{
	display:flex;
	flex-direction: column;
	justify-content: center;
	padding: 5px 0px;
	margin-top: 20px;
	.el-row {
    margin-bottom: 20px;
	height: 60px;
	margin-top: 20px;
	&[flg='true']{
		height:220px;
	}
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
	height: 100%;
	}
	.grid-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		a{
			// flex:2;
		}
		.banner{
			// flex:4;
		}
		.footer{
			// flex:1;
			margin-top: 0;
			a:hover{
				span{
					color:rgb(188, 188, 188);
				}
			}
			span{
				font-size:14px;
				margin-right: 20px;
				line-height: 30px;
				color:rgb(162, 162, 162);
			}
			
		}
  	}
}
</style>
