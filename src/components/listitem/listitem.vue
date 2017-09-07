<template>
  <transition name="slide">
    <div class="allitem" ref="articles">
      <div v-if="Object.keys(articles).length">         
         <div class="img">
            <img :src="/img/+articles.author.avatar" alt="">  
          </div>
          <div class="text">
            <h3>{{articles.title}}</h3>
            <div class="time">
                发布时间：{{articles.created_at}}
            </div>
            <p v-html="articles.content"></p>
            <div class="btm">
              <div class="viewmsg">
                <span>浏览（{{articles.pv}}）</span>
                <span>留言（{{articles.commentsCount}}）</span>
              </div>
            </div>
          </div> 
        </div>
        <h3 class="leavemsg">留言：</h3>
        <ul>
          <li v-for="(item,index) in comments">
            <div class="img">
                <img :src="/img/+item.author.avatar" alt="">  
              </div>
              <div class="text">
                <h3>{{item.author.name}}</h3>
                <div class="time">
                    发布时间：{{item.created_at}}
                </div>
                <p v-html="item.content"></p>
              </div>
          </li>
        </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {getEachArticle} from 'api/articles'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      articles: {},
      comments: []
    }
  },
  created () {
    console.log(this.$route.params)
    this._getEachArticle(this.$route.params.id)
  },
  methods: {
    _getEachArticle (id) {
      getEachArticle(id).then((res) => {
        if (res.code === ERR_OK) {
          this.articles = res.data.post
          this.comments = res.data.comments
        }
      })
    }
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
    background: #fff
    .leavemsg
      padding 10px 
      font-size $f14
      color $color-theme
      background #eee
    >div,li
      display: flex
      box-sizing: border-box
      align-items flex-start
      justify-content: space-between
      padding: 0 20px 20px 20px
      .img
        flex: 0 0 80px
        width: 80px
        padding-right: 20px
        img
          width 100%
          height 100%
      .text
          display: flex
          flex-direction: column
          flex 1
          h3
            color $color-title
            font-size $f14
            line(2)
            line-height 18px
            word-break break-all
          .time
            margin-top 5px 
            font-size $f12
            color $fc99
          p
            color $fc99
            font-size $f12
            margin-top 5px
            line-height 15px
          .btm
            display flex
            align-self flex-end
            margin-top 5px
            .viewmsg
              color $fc99
              font-size $f12        
</style>