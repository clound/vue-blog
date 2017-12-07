<template>
 <transition name="slide">
    <div class="allitem" ref="articles">
      <topHeader :title="`我的文章`"></topHeader>
      <div class="list-content" v-if="articles.length">
        <scroll :data="articles" 
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        class="list"
        ref="list">     
          <div class="articles" ref="">
            <list-item
            :articles="articles"
            :showAvatar="false"
            :isLink="false"
            ></list-item>
          </div>
        </scroll>
      </div>
      <div class="wrapper-kong" v-else>
          <kong :title="`暂未发表`"></kong>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
import topHeader from 'base/top-header/top-header'
import {getArticles} from 'api/articles'
import ListItem from 'base/listitem/listitem'
import Kong from 'base/kong/kong'
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
  computed: {
    ...mapGetters([
      'author'
    ])
  },
  methods: {
    reloadDataFun () {
      this._getArticles()
    },
    _getArticles () {
      getArticles(this.author._id).then((data) => {
        this.articles = data
      })
    }
  },
  components: {
    topHeader,
    Scroll,
    ListItem,
    Kong
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
  .allitem
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .list-content
      position: fixed
      width: 100%
      top: 44px
      bottom: 0
      .list
        height: 100%
        overflow: hidden    
  .wrapper-kong  
      padding 45% 0 0
</style>