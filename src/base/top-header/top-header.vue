  <template>
    <div class="back">
        <i class="icon-back" @click="back()"></i>
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
          this.$emit('back')
        }
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
   .back
      padding 10px
      border-bottom 1px solid #eee
      text-align center
      i
        float left 
</style>