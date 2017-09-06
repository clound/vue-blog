<template>
  <transition name="slide">
    <div class="login">
      <div class="back">
        <i class="icon-back" @click="back"></i>
        <span>登录</span>
      </div>
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
  </transition>
</template>
<script type="text/ecmascript-6">
  import {signInUp} from 'api/signin'
  import {ERR_OK} from 'api/config'
  export default {
    data () {
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      _signin (event) {
        event.preventDefault()
        signInUp('/signin/', this.form).then((res) => {
          if (res.code === ERR_OK) {
            this.$router.push('/')
          } else {
            alert(res.info)
          }
        })
      },
      back () {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .login
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #fff
    .back
      padding 10px
      border-bottom 1px solid #eee
      text-align center
      i
        float left 
    form


      padding 10px
      h4
        margin 8px 0
      textarea
        height 80px
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
    .toRegister
      text-align center
      font-size $f14
      span
        color #f7ba2a
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

