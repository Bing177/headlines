<template>
    <Common :typeList="recreationList"/>
</template>

<script>
import _ from 'lodash'
import Common from '../../components/Common'
import { mapState } from 'vuex'
export default {
    name: 'Recreation',
    components: { Common },
    computed: {
        ...mapState('nav',['recreationList'])
    },
    methods: {
        debounce: _.debounce(function () {
            this.$store.dispatch('nav/getRecreation')
        })
    },
    activated() {
        this.debounce()
    }
}
</script>

<style>
</style>