<template>
  <div class="list-content">
    <scroll :data="products" 
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="list">   
        <ul>
          <li v-for="(item, index) in products">
            <router-link :to="{name: 'product-detail', params: {id: item.id}}">
              <img :src="`/images/${item.src}`" alt="">
              <h4>{{item.name}}</h4>
              <p>¥{{item.price}}</p>
            </router-link>
          </li>
        </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {getproducts} from 'api/products'
export default {
  data () {
    return {
      products: []
    }
  },
  created () {
    this._getproducts()
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    reloadDataFun () {
      this._getproducts()
    },
    _getproducts () {
      getproducts().then((data) => {
        this.products = data.shop.list
        this.setProducts(data.shop.list)
      })
    },
    ...mapMutations({
      setProducts: 'SET_PRODUCTS'
    })
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .list-content
    position: fixed
    width 100%
    top 44px
    bottom 0
    padding 0 10px;
    .list
      height calc(100% - 50px)
      overflow hidden
      li
        display inline-block
        vertical-align top
        width calc(50% - 5px)
        margin-bottom 10px
        &:nth-child(odd)
          margin-right 10px
        h4
          font-size 13px
          padding 5px 0
        p
          text-align right
          color $color-other
</style>