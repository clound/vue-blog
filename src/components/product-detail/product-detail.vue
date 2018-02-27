<template>
  <transition name="slide">
    <div class="product" ref="products">
      <topHeader :title="title" @back="backfun"></topHeader>
      <div class="moreInfo">
        <div class="imgheader">
          <img :src="`/images/${productsInfo.src}`" alt="">
        </div>
        <h4>{{productsInfo.name}}</h4>
        <p>¥{{productsInfo.price}}</p>
      </div>
      <div class="packages" ref="packages">
        <h5>码数</h5>
        <span v-for="(item, index) in productsInfo['mashu']">
          <input type="radio" :id="'mashu'+item" :value="item"
           class="input"
           v-model="mashu">
          <label :for="'mashu'+item" class="active">{{item}}</label>
        </span>
        <h5>数量</h5>
        <selectNum  @count-num="getSelectNum" />
        <div class="toadd">
          <button @click="addCart">加入购物车</button>
        </div>
      </div>
      <div class="order">
        <span>总计：<b>¥{{productsInfo.price}}</b></span>
        <button @click="showOpts">加入购物车</button>
      </div>
      <fixedMask :show="showmask" @touchmask="touchmask"></fixedMask>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import topHeader from 'base/top-header/top-header'
import selectNum from 'base/selectNum/index'
import fixedMask from 'base/fixedmask/fixedmask'
export default {
  data () {
    return {
      title: '',
      mashu: '',
      showmask: false,
      productsInfo: {},
      carts: {
        id: this.$route.params.id
      }
    }
  },
  created () {
    let id = Number(this.$route.params.id) - 1
    this.productsInfo = this.products[id]
    this.title = this.productsInfo.name.substr(0, 4)
  },
  watch: {
    mashu(newval) {
      this.carts['mashu'] = newval
    }
  },
  computed: {
    ...mapGetters([
      'products'
    ])
  },
  methods: {
    backfun() {
      this.$emit('reloadData')
    },
    touchmask() {
      this.showmask = false
      this.$refs.packages.style.bottom = '-300px'
    },
    showOpts() {
      this.showmask = true
      this.$refs.packages.style.bottom = '50px'
    },
    addCart() {
      this.addCarts(this.carts)
      this.$alert('加入购物车成功')
    },
    getSelectNum(val) {
      this.carts['num'] = val.count
    },
    ...mapActions([
      'addCarts'
    ])
  },
  components: {
    topHeader,
    selectNum,
    fixedMask
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .product
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .moreInfo
      min-height calc(100% - 44px - 100px)
      .imgheader
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          top 0
          width 100%
          height 100%
      h4
        font-size 15px
        color $fc33
        padding 10px
      p
        font-size $f18
        text-align right 
        margin-right 10px
        color $color-other
    .packages
      position absolute
      width 100%
      height 300px
      bottom -300px
      padding 20px
      background-color #fff 
      z-index 200
      transition all 0.2s
      h5
        font-size $f18
        padding 10px 0 
      .input:checked+label
        color #fff
        background-color $color-other
      .input
        display none  
      label 
        display inline-block
        width 30px
        height 30px
        line-height 30px
        text-align center
        color $fc66
        border 1px solid $color-other
      .toadd
        position absolute
        width calc(100% - 40px)
        bottom 10px
        height 50px
        button 
          width  100%
          height 100%
          border 0
          color #fff
          background $color-other
    .order
      position relative
      height 50px
      line-height 50px
      border-top 1px solid #eee
      span 
        padding-left 10px
        font-size $f18
        b
          color $color-other
      button 
        position absolute;
        right 0
        top 0
        width  130px
        height 100%
        border 0
        color #fff
        background $color-other
</style>