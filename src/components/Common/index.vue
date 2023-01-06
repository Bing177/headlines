<template>
  <div class="box">
    <el-row>
      <div class="container" v-for="(t,idx) of typeList" :key="idx">
        <!-- 第一种布局方式：只有标题部分 -->
        <div class="layout-1" v-if="t.flg === 0">
          <span>
            <router-link to="/abc">{{ t.title }}</router-link>
          </span>
        </div>
			  <!-- 第二种布局方式：有标题和内容和详细信息 -->
        <div class="layout-2" v-if="t.flg === 1">
          <div class="layout-2-content">
            <el-container>
              <!-- 标题 -->
              <el-header height="40px">
                <router-link to="/abc">{{ t.title }}</router-link>
              </el-header>
              <!-- 图片 -->
              <el-main>
                <div>
                  <router-link to="/abc" v-for="(val,idx) of t.img" :key="idx">
                    <img :src="val" alt="出错了"/>
                  </router-link>
                </div>
              </el-main>
              <!-- 底部 -->
              <el-footer height="40px">
                <router-link to="/abc">{{ t.publish }}</router-link>
                <router-link to="/abc">{{ t.comment }}</router-link>
                {{ t.time }}
              </el-footer>
            </el-container>
          </div>
        </div>
        <!-- 第三种布局方式：点赞、评论、转发 -->
        <div class="layout-3" v-if="t.flg === 2">
          <div class="layout-3-left">
            <div class="top">
              <router-link to="/abc">{{ t.publish }}</router-link>
              <router-link to="/abc" style="padding-left:20px;">{{ t.time }}</router-link>
              <button v-if="t.attention === 1">+ 关注</button>
            </div>
            <div class="main">
              <router-link to="/abc">{{ t.title }}</router-link>
            </div>
            <div class="foot">
              <div>
                <router-link to="/abc"><img src="../../assets/share.png"/>分享</router-link>
              </div>
              <div>
                <router-link to="/abc"><img src="../../assets/comment.png"/>{{ t.comment }}</router-link>
              </div>
              <div>
                <router-link to="/abc"><img src="../../assets/praise.png"/>{{ t.praise }}</router-link>
              </div>
            </div>
          </div>
          <div class="layout-3-right">
            <router-link to="/abc"><img :src="t.img" /></router-link>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
	name: 'Common',
	props:['typeList']
}
</script>

<style lang="less">
.box{
	.el-row{
		display: flex;
		flex-direction: column;
		padding: 5px;
		margin: 5px;
		.container{
			padding: 10px 0;
			.layout-1{
				height:60px;
				line-height: 60px;
				span{
					a{
						font-size:20px;
						font-weight:500;
						&::after{
							content: '置顶';
							display: inline-block;
							font-size: 12px;
							line-height: 16px;
							color:#f04142;
							background-color: #fff2f2;
							border-radius: 4px;
							padding:2px 4px;
							position: relative;
							top: -2px;
							left: 6px;
						}
					}
				}
			}
			.layout-2{
				height: 200px;
				.layout-2-content{
					height: inherit;
					margin: 5px;
					.el-container {
    					margin-bottom: 40px;
						.el-header, .el-footer {
    						color: #333;
    						line-height: 40px;
							padding-left: 0;
  						}
						.el-header{
							a{
								font-size: 20px;
								font-weight:500;
							}
						}
						.el-footer{
							color: rgb(118, 118, 118);
							a{
								color: inherit;
								padding-right: 10px;
								&:hover{
									color:rgb(181, 181, 181)
								}
							}
						}
						.el-main {
							height: 130px;
							margin:0;
    						color: #333;
    						text-align: center;
    						line-height: 130px;
							border:0;
							padding:0;
							overflow-y: hidden;
							div{
								height: inherit;
								a{
									float: left;
									width: 150px;
									height: 130px;
									margin:0 7px;
									&:first-child{
										margin-left:0;
									}
									img{
										width: inherit;
										height: inherit;
									}
								}
							}
  						}
  					}
				}
			}
			.layout-3{
				height: 160px;
				display: flex;
				.layout-3-left,
				.layout-3-right{
					height: inherit;
				}
				.layout-3-left{
					flex: 3;
					display: flex;
					flex-direction: column;
					.top,.main,.foot{
						width: inherit;
					}
					.top{
						flex: 1;
						position: relative;
						
						a{
							display: inline-block;
							font-size: 16px;
							&:hover{
								color: #6f6f6f;
							}
						}
						button{
							display: inline-block;
							position: relative;
							top: 0;
							left: 60%;
							width: 56px;
							height: 28px;
							line-height: 28px;
							font-size: 12px;
							color:#2f2f2f;
							background-color: #efefef;
							border: 0;
							border-radius: 4px;
							&:hover{
								cursor: pointer;
								color:#6f6f6f;
							}
						}
					}
					.main{
						flex:2;
						a{
							display: -webkit-box;
							width: inherit;
							height: 80px;
							font-size: 20px;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
						}
					}
					.foot{
						flex:1;
						display: flex;
						line-height: 40px;
						div{
							a{
								display:inline-block;
								height: 30px;
								margin-right: 20px;
								font-size: 14px;
								&:hover{
									color:#6f6f6f;
								}
								img{
									width: 20px;
									height: 20px;
									vertical-align: middle;
									margin-right: 10px;
								}
							}
						}
					}
				}
				.layout-3-right{
					flex: 1;
					a{
						display: -webkit-box;
						width: inherit;
						height: inherit;
						overflow: hidden;
						img{
							width: 160px;
							height: 160px;
						}
					}
				}
			}
		}
	}
}
</style>