<template>
    <Common :typeList="internationalList"/>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Common from '../../components/Common'
export default {
    name: 'International',
    components: { Common },
    computed: {
        ...mapState('nav', ['internationalList'])
    },
    methods: {
        debounce: _.debounce(function () {
            this.$store.dispatch('nav/getInternational')
        })
    },
    activated() {
        this.debounce()
    },
}
</script>

<style>
</style>