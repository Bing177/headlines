<template>
  <Common :typeList="hotList"/>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Common from '../../components/Common'
export default {
  name: 'Hot',
  components: { Common },
  computed: {
    ...mapState('nav',['hotList'])
  },
  methods: {
    debounce: _.debounce(function () {
      this.$store.dispatch('nav/getHot')
    })
  },
  activated() {
    this.debounce()
  }
}
</script>

<style>

</style>