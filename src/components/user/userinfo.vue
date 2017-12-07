<template>
  <div class="userInfo">
    <div class="useravtar">
      <img :src="/img/+author.avatar">
    </div>
    <ul class="userinfo">
      <li><span>名字:</span><span>{{author.name}}</span></li>
      <li><span>性别:</span><span>{{author.gender=='m'?'男':'女'}}</span></li>
      <li><span>个性说明:</span><span>{{author.bio}}</span></li>
    </ul>
    <router-link to="/my/selfarticles">
      <li>
        <div>发表文章：<i class="iconfont icon-right"></i></div>
      </li>
    </router-link>
    <router-link to="/chatrooms">
      <li>
        <div>聊天室<i class="iconfont icon-right"></i></div>
      </li>
    </router-link>
    <!-- <router-link to="/my/selfcomments">
      <li>
        <div>我的留言：<i class="iconfont icon-right"></i></div>
      </li>
    </router-link> -->
    <router-view></router-view>
  </div>
</template>
 
 <script type="text/ecmascript-6">
  import {isLogin} from 'common/js/mixin'
  export default {
    mixins: [isLogin],
    data () {
      return {
        id: ''
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .userInfo
    padding 10px
    .useravtar
      text-align center
      margin-bottom 10px
      img 
        width 80px
        height 80px
        border-radius 50%
    li
      display flex
      justify-content  space-between
      height 40px
      line-height 40px
      padding 0 10px
      border-1px(#dadada)
      margin-bottom 10px
      color $fc99
      img 
        width 80px
        height 80px
        border-radius 50%    
      >div
        width 100%
        display flex
        i 
          flex 1
          text-align right
</style>

