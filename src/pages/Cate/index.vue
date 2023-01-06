<template>
    <Common :typeList="cateList" />
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Common from '../../components/Common'
export default {
    name: 'Cate',
    components: { Common },
    computed: { ...mapState('nav', ['cateList']) },
    methods: { debounce: _.debounce(function () { this.$store.dispatch('nav/getCate') }) },
    activated(){this.debounce()}
}
</script>

<style>
</style>