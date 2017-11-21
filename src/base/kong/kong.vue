<template>
  <div class="no-result">
    <div class="iconfont icon-emptybox"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '空空如也~~'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .no-result
    text-align: center
    .iconfont
      font-size $f24
    .no-result-text
      margin-top: 30px
      font-size: $f22
      color: $fc99
</style>