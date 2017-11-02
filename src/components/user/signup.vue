<template>
  <transition name="slide">
    <div class="login">
      <topHeader :title="'注册'"></topHeader>
      <form action="" method="post" enctype="multipart/form-data">
        <h4>用户名 <i class="red">*</i></h4>
        <input type="text" class="" name="name" v-model="form.name">
        <h4>密码 <i class="red">*</i></h4>
        <input type="password" name="password" v-model="form.password"/>
        <h4>重复密码 <i class="red">*</i></h4>
        <input type="password" class="" name="repassword" v-model="form.repassword">
        <h4>性别 <i class="red">*</i></h4>
        <select name="gender" id="" v-model="form.gender">
          <option value="m">男</option>
          <option value="f">女</option>
          <option value="x">保密</option>
        </select>
        <h4>头像 <i class="red">*</i></h4>
        <input type="file" name="avatar" id="file" @change="getFile($event)">
         <h4>个人简介 <i class="red">*</i></h4>
        <textarea name="bio" id="" cols="30" rows="10" v-model="form.bio"></textarea>
        <input type="submit" class="btn" value="注册" @click="_signup($event)">
      </form>
    </div>
  </transition>
</template>
<script>
  import {signInUp} from 'api/signin'
  import {ERR_OK} from 'api/config'
  import topHeader from 'base/top-header/top-header'
  export default {
    data () {
      return {
        form: {
          name: '',
          password: '',
          repassword: '',
          gender: '',
          avatar: '',
          bio: ''
        }
      }
    },
    methods: {
      getFile (event) {
        this.form.avatar = event.target.files[0]
      },
      _signup (event) {
        event.preventDefault()
        let formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('password', this.form.password)
        formData.append('repassword', this.form.repassword)
        formData.append('gender', this.form.gender)
        formData.append('avatar', this.form.avatar)
        formData.append('bio', this.form.bio)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        signInUp('/signup/', formData, config).then((res) => {
          if (res.code === ERR_OK) {
            this.$router.push('/')
          } else {
            this.$alert(res.info)
          }
        })
      },
      back () {
        this.$router.push('/')
      }
    },
    components: {
      topHeader
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
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

