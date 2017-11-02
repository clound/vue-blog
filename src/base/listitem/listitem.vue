<template>
  <div class="listitems">
    <ul>
      <li v-for="item in articles" class="item border-1px"> 
        <router-link :to="{name: 'article-detail', params: {id: item._id}}">
            <div class="img">
              <img :src="/img/+item.author.avatar" alt="">  
            </div>
            <div class="text">
              <h3>{{item.title}}</h3>
              <div class="time">
                  发布时间：{{item.created_at}}
              </div>
              <p v-html="item.content"></p>
              <div class="btm">
                <div class="viewmsg">
                  <span v-show="item.pv">浏览（{{item.pv}}）</span>
                  <span v-show="item.commentsCount">留言（{{item.commentsCount}}）</span>
                </div>
              </div>
            </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      articles: Array
    },
    created() {
      console.log(this.articles)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .listitems
    width:100%
    .item
      padding 10px
      border-1px(rgba(1, 17, 27, 0.1))
      a
        display: flex
        box-sizing: border-box
        align-items flex-start
        justify-content: space-between
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