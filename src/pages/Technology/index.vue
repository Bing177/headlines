<template>
    <Common :typeList="technologyList"/>
</template>

<script>
import _ from 'lodash'
import Common from '../../components/Common'
import { mapState } from 'vuex'
export default {
    name: 'Technology',
    components: { Common },
    computed: {
        ...mapState('nav',['technologyList'])
    },
    methods: {
        debounce: _.debounce(function () {
            this.$store.dispatch('nav/getTechnology')
        })
    },
    activated() {
        this.debounce()
    }
}
</script>

<style>

</style>