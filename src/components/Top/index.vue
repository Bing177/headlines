<template>
	<div>
		<el-row align="center">
  			<el-col :span="6" :push="8"><div class="grid-content bg-purple-dark"><span>头条新闻</span></div></el-col>
		</el-row>
		<el-row type="flex" justify="space-between" style="position:relative;">
  			<el-col :lg="14" :span="20" :push="4">
				<div class="grid-content bg-purple">
					  <el-input
					    ref="inp"
  						placeholder="请输入内容"
  						v-model="input"
  						clearable>
					</el-input>
				</div>
			</el-col>
			<el-button style="position:absolute;right:147px;" class="btn" type="primary" icon="el-icon-search">搜索</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'NewsTop',
		data() {
			return {
				input:''
			}
		},
	}
</script>

<style lang="less">
//头条文字
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
	  margin-top: 50px;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #F04142;
	text-align: center;
	font-size: 30px;
	line-height: 50px;
	color: #fff;
  }

//输入框
.btn{
	height: 40px;
	// margin-top:1px !important;
    margin-right: 61px !important;
    z-index: 0;
    width: 60px;
    padding-left: 5px !important;
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
</style>
