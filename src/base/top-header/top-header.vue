  <template>
    <div class="back">
        <i class="iconfont icon-left" @click="back"></i>
        <span>{{title}}</span>
      </div>    
  </template>
  <script type="text/ecmascript-6">
    export default {
      props: {
        title: {
          type: String,
          defaukt: ''
        }
      },
      methods: {
        back () {
          this.$router.back()
          this.$emit('back')
        }
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
   .back
    position: relative
    height: 44px
    line-height 44px
    text-align: center 
    color: $color-theme
    padding: 3px 18px 
    box-shadow(0 2px 4px rgba(0,0,0,.1)) 
    i
      float left 
</style>