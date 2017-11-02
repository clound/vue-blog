<template>
  <div>
    <div class="login" v-if="!isLogin">
      <topHeader :title="title"></topHeader>
      <form action="" method="post" ref="signform">
        <h4>用户名 <i class="red">*</i></h4>
        <input type="text" class="title" name="name" v-model="form.name">
        <h4>密码 <i class="red">*</i></h4>
        <input type="text" class="title" name="password" v-model="form.password">
        <input type="submit" class="btn" value="登录" @click="_signin($event)">
      </form>
      <div class="toRegister">
        <router-link to="/signup">
          <span class="toRegisterLink">未有账号，立即注册>></span>
        </router-link>
      </div>
    </div>
    <div class="haslogin" v-else>
      <topHeader :title="title"></topHeader>
      <ul class="userinfo">
        <li><img :src="/img/+userInfo.avatar"></li>
        <li>名字:{{userInfo.name}}</li>
        <li>性别:{{userInfo.gender=='m'?'男':'女'}}</li>
        <li>个性说明:{{userInfo.bio}}</li>
      </ul>  
      <a @click="_logout($event)" class="logout">退出登录</a>
    </div>
    <Confirm :text="text" ref="confirm"></Confirm>
  </div>
</template>
 <script type="text/ecmascript-6">
  import topHeader from 'base/top-header/top-header'
  import Confirm from 'base/confirm/confirm'
  import {getLoginInfo, signInUp, signOut} from 'api/signin'
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
      },
      _signin (event) {
        event.preventDefault()
        signInUp('/signin/', this.form).then((res) => {
          if (res.code === ERR_OK) {
            this.$router.push('/')
          } else {
            this.text = res.info
            this.$alert(res.info)
          }
        })
      },
      _logout (event) {
        event.preventDefault()
        signOut('/signout/').then((res) => {
          if (res.code === ERR_OK) {
            this.$router.push('/')
          }
        })
      }
    },
    components: {
      topHeader,
      Confirm
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .login,.haslogin
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #fff
    form
      padding 10px
      h4
        margin 8px 0
      textarea
        height 80px
    .btn,.logout
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
    .toRegister
      text-align center
      font-size $f14
      span
        color #f7ba2a
    .userinfo
      padding 10px
      li
        text-align center
        margin-bottom 10px
        color $fc99
        img 
          width 80px
          height 80px
          border-radius 50%
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

