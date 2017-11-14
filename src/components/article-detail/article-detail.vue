<template>
  <transition name="slide">
    <div class="allitem" ref="articles">
      <topHeader :title="title" @back="backfun"></topHeader>
      <scroll :data="comments" 
        class="list"
        ref="list">
        <div>
          <div v-if="Object.keys(articles).length" class="itemContent">         
            <div class="text">
              <span class="edit" @click="deleteArticle" v-show="isLogin && articles.author._id===isLogin"><i class="iconfont icon-suggest"></i>&nbsp;删除</span>
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
          <div class="reviewer-wrapper">            
              <div>
                <list-item :articles="comments" 
                          :isLogin="login"
                          :isLink="false"
                          @delleaveMsg="delleaveMsg"></list-item>
                <form v-show="isLogin" class="form" method="post" :action='"/posts/"+articles._id+"/comment"'>
                  <div class="field">
                    <textarea name="content" v-model="form.content"></textarea>
                  </div> 
                  <input type="submit" class="btn" value="留言" @click="_comment($event)" />
                </form>
              </div>
          </div>   
        </div>
      </scroll>     
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {getEachArticle, postComment, removeArticle, removeLeaveMsg} from 'api/articles'
import {ERR_OK} from 'api/config'
import {getCookie} from 'common/js/util'
import ListItem from 'base/listitem/listitem'
import topHeader from 'base/top-header/top-header'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      title: '',
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
    backfun() {
      this.$emit('reloadData')
    },
    deleteArticle() {
      removeArticle(this.$route.params.id).then((res) => {
        if (res.code === ERR_OK) {
          this.$emit('reloadData')
          this.$router.back()
        }
      })
    },
    delleaveMsg(itemId, index) {
      let params = Object.assign({}, {'commentId': itemId}, {'postId': this.$route.params.id})
      removeLeaveMsg(params).then((res) => {
        if (res.code === ERR_OK) {
          this.comments.splice(index, 1)
        }
      })
    },
    _getEachArticle (id) {
      getEachArticle(id).then((res) => {
        if (res.code === ERR_OK) {
          this.articles = res.data.post
          this.comments = res.data.comments
          this.form.postId = res.data.post._id
          this.title = this.articles.title.substr(0, 4)
        }
      })
    },
    _comment (event) {
      event.preventDefault()
      postComment(this.form).then((res) => {
        if (res.code === ERR_OK) {
          this._getEachArticle(this.$route.params.id)
        } else {
          this.$alert(res.info)
        }
      })
    }
  },
  components: {
    ListItem,
    topHeader,
    Scroll
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
    .list
      width 100%
      height calc(100% - 94px)
      overflow hidden
    .itemContent
      position relative
      padding 10px
      .edit
        float right 
        font-size $f12
        color #f2a133
      h3
        text-align center
        color: $color-theme
      .time
        text-align center
        margin-top 5px
        font-size $f12
        color $fc99
      p
        text-indent 2em
        margin-top 5px
        line-height 22px
        color $fc66
        font-size $f14
      .btm
        display flex
        margin-top 5px
        justify-content flex-end
        .viewmsg
          color $fc99
          font-size $f12
    .leavemsg
      padding 10px 
      font-size $f14
      color $color-theme
      background #eee
    .reviewer-wrapper
      position relative
      
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
      width 90%
      padding: 10px 0;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #20a0ff;
      border-color: #20a0ff;
      left: 50%;
      position: relative;
      transform: translateX(-50%);
      margin-top 10px

</style>