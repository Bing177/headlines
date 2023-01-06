<template>
	<Comment :typeList="recommendList"/>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import Comment from '../../components/Common'

export default {
	name: 'Recommend',
	components:{Comment},
	data() {
		return {
		}
	},
	computed: {
		...mapState('nav', ['recommendList']),
	},
	methods: {
		debounce: _.debounce(function () {
			this.$store.dispatch('nav/getRecommend')
		}, 100),
	},
	activated() {
		this.debounce()
	},
	deactivated() {
		
	}
}
</script>

<style>
</style>