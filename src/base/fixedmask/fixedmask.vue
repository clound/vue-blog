<template>
  <div class="fixedmask" v-show="show" @click="touchfixed"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      touchfixed () {
        this.$emit('touchmask')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .fixedmask
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(0,0,0,0.25)
    z-index 100
</style>