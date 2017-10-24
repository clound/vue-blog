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
          <li v-for="(item,index) in comments" :key="index">
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
        <form v-if="Object.keys(articles).length" class="form" method="post" :action='"/posts/"+articles._id+"/comment"'>
            <div class="field">
              <textarea name="content" v-model="form.content"></textarea>
            </div>
            
            <input type="submit" class="btn" value="留言" @click="_comment($event)" />
        </form>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {getEachArticle, postComment} from 'api/articles'
import {ERR_OK} from 'api/config'
import {getCookie} from 'common/js/util'
export default {
  data () {
    return {
      articles: {},
      comments: [],
      login: (() => {
        return getCookie('blogtoken')
      })(),
      form: {
        postId: '',
        content: ''
      }
    }
  },
  created () {
    this._getEachArticle(this.$route.params.id)
  },
  computed: {
    isLogin () {
      return this.login
    }
  },
  methods: {
    _getEachArticle (id) {
      getEachArticle(id).then((res) => {
        if (res.code === ERR_OK) {
          this.articles = res.data.post
          this.comments = res.data.comments
          this.form.postId = res.data.post._id
        }
      })
    },
    _comment (event) {
      event.preventDefault()
      postComment(this.form).then((res) => {
        if (res.code === ERR_OK) {
          this._getEachArticle(this.$route.params.id)
        } else {
          alert(res.info)
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
  .field
    display flex
    justify-content center
    textarea
      margin-top 20px
      height 80px
      width 90%
  .btn
    display: inline-block;
    text-align: center;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    left: 50%;
    position: relative;
    transform: translateX(-50%);
    margin-top 10px
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