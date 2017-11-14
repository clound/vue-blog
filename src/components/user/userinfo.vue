<template>
  <div class="userInfo">
    <div class="useravtar">
      <img :src="/img/+userInfo.avatar">
    </div>
    <ul class="userinfo">
      <li><span>名字:</span><span>{{userInfo.name}}</span></li>
      <li><span>性别:</span><span>{{userInfo.gender=='m'?'男':'女'}}</span></li>
      <li><span>个性说明:</span><span>{{userInfo.bio}}</span></li>
    </ul>
  </div>
</template>
 <script type="text/ecmascript-6">
  import {getLoginInfo} from 'api/signin'
  import {ERR_OK} from 'api/config'
  import {getCookie} from 'common/js/util'
  export default {
    data () {
      return {
        text: '',
        title: '登录',
        login: (() => {
          return getCookie('blogtoken')
        })(),
        form: {
          name: '',
          password: ''
        },
        userInfo: {}
      }
    },
    created () {
      this._config()
      this.isLogin = this.login
    },
    methods: {
      _config () {
        getLoginInfo('signin').then((res) => {
          if (res.code === ERR_OK) {
            this.userInfo = res.data
          }
        })
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
</style>

