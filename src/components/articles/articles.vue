<template>
<div class="list-content">
  <scroll :data="articles" 
  :listen-scroll="listenScroll"
  :probe-type="probeType"
  class="list"
  ref="list">     
    <div class="articles" ref="">
      <list-item :articles="articles"></list-item>
    </div>
  </scroll>
  <router-view @reloadData="reloadDataFun"></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getArticles} from 'api/articles'
import ListItem from 'base/listitem/listitem'
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this._getArticles()
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    reloadDataFun () {
      this._getArticles()
    },
    _getArticles () {
      getArticles().then((data) => {
        this.articles = data
      })
    }
  },
  components: {
    Scroll,
    ListItem
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .list-content
    position: fixed
    width: 100%
    top: 44px
    bottom: 0
    .list
      height: calc(100% - 50px)
      overflow: hidden      
</style>