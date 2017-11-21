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
        <div>发表过的：<i class="iconfont icon-right"></i></div>
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    mounted () {
      setTimeout(() => {
        this._config()
      }, 20)
    },
    computed: {
      ...mapGetters([
        'author'
      ])
    },
    methods: {
      _config () {
        if (!Object.keys(this.author).length) {
          this.$router.push('signin')
        }
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

