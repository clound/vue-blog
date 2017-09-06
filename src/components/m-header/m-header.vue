<template>
  <div class="m-header">
    <h1 class="text">技艺杂谈</h1>
    <router-link tag="div" class="mine" to="/signin">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: left 
    color: $color-theme
    font-size: 0
    padding: 3px 18px 
    box-shadow(0 2px 4px rgba(0,0,0,.1)) 
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $f18
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>