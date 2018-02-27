<template>
  <div class="selectNum">
    <span class="decreaseNum" @click="decNum"><i class="iconfont icon-desc"></i></span>
    <span class="countNum">{{count}}</span>
    <span class="addNum" @click="addNum"><i class="iconfont icon-plus"></i></span>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  props: {
    index: {
      type: [String, Object, Number]
    },
    num: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      count: Number(this.num)
    }
  },
  watch: {
    num (val) {
      this.count = Number(val)
    }
  },
  methods: {
    decNum () {
      if (this.count === this.min) {
        this.$alert(`最少选择数量为：${this.min}`)
        return this.min
      }
      this.count -= 1
      this.$emit('count-num', this)
    },
    addNum () {
      this.count += 1
      this.$emit('count-num', this)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
.selectNum
  display: inline-block
  width: 130px
  height: 35px
  text-align: center
  vertical-align: top
  border-radius: 2px
  overflow: hidden
  color: #fff
  font-size: 0
  .decreaseNum, .addNum
    display: inline-block
    width: 35px
    height: 100%
    line-height: 34px
    background: #bfbfbf
    vertical-align: top
    &>.iconfont
      font-size: 14px
  .addNum
    background: orange
  .countNum
    display: inline-block
    width: 40px
    height: 100%
    color: $fc66
    line-height: 35px
    font-size: 12px
    vertical-align: top
    background: $fc99
</style>
