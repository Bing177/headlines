<template>
    <Common :typeList="gameList" />
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Common from '../../components/Common'
export default {
    name: 'Game',
    components: { Common },
    computed: { ...mapState('nav', ['gameList']) },
    methods: { debounce: _.debounce(function () { this.$store.dispatch('nav/getGame') }) },
    activated(){this.debounce()}
}
</script>

<style>
</style>