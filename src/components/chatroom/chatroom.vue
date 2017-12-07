<template>
  <div class="chatroom">
    <div class="top">
      <i class="iconfont icon-left" @click="back"></i>
      <span>聊天室</span>
      <i class="iconfont icon-ren-xuanzhong" @click="showUsersPanel"></i>
    </div>
    <scroll :data="chatinfo" 
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="chatInfo"
      @hasRefresh="hasRefresh"
      ref="chatlist">
      <div class="">
        <ul>
          <li v-for="(item, index) in chatinfo">
            <div class="self" v-if="item.userId===userId">
              <span class="name">{{nowTime}}</span>
              <span class="name">{{item.userName}}</span>
              <div class="chatcontent">{{item.content}}</div>
            </div>
            <div class="services" v-else>
              <span class="name">{{item.userName}}</span>
              <span class="name">{{nowTime}}</span>
              <div class="chatcontent">{{item.content}}</div>
            </div>
          </li>
        </ul>
      </div>
    </scroll> 
    <div class="bottom">
      <input type="text" v-model="inputMsg">
      <button @click="sendMsg">Send</button>
    </div>
    <transition name="slide">
      <div class="usersWraper" 
        v-show="showUsers"
        @click="closeUsersPanel">
        <div class="userlists">
          <p>当前共有{{userlists.length}}在线,列表:</p>
          <scroll :data="userlists" 
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          class="list"
          ref="list">     
            <div>
              <li v-for="(item, index) in userlists" 
              :data-id="item[0]">{{item[1]}}</li>
            </div>
          </scroll> 
        </div>
      </div>
    </transition>
  </div>
</template>

 <script type="text/ecmascript-6">
  import {isLogin} from 'common/js/mixin'
  import {mapGetters} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {formatDate} from 'common/js/util'
  /* eslint-disable */
  const socket = io()
  export default {
    mixins: [isLogin],
    data() {
      return {
        userId: new Date().getTime() + "" + Math.floor(Math.random() * 889 + 100),
        userName: '',
        inputMsg: '',
        showUsers: false,
        userlists: [],
        chatinfo: []
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.userName = this.author.name
      this.emitLogin()
    },
    computed: {
      nowTime() {
        return formatDate(new Date(), 'yyyy-MM-dd hh:mm')
      },
      ...mapGetters([
        'author'
      ])
    },
    methods: {
      sendMsg() {
        let obj = {
          userId: this.userId,
          userName: this.userName,
          content: this.inputMsg
        };
        socket.emit('message', obj)
        this.inputMsg = ''
      },
      emitLogin() {
        let me = this
        socket.connect()
        socket.emit('login',{userId: this.userId, userName: this.userName})
        socket.on('login', (o) => {
          this.$fadeMsg(`${o.user.userName}加入聊天室`)
          this._updateSysMsg(o, 'login')
        })
        socket.on('logout', (o) => {
          this.$fadeMsg(`${o.user.userName}退出聊天室`)
          this._updateSysMsg(o, 'login')
        })
        socket.on('message', (msgobj) => {
          this.chatinfo.push(msgobj)
        })
      },
      hasRefresh(maxScrolly) {
        this.$refs.chatlist.scrollTo(0, maxScrolly, 1000)
      },
      showUsersPanel() {
        this.showUsers = true;
        this.$nextTick(() => {
          this.$refs.list.refresh()
        })
      },
      closeUsersPanel() {
        this.showUsers = false;
      },
      back () {
        socket.disconnect()
        this.$router.back()
      },
      _updateSysMsg(o, action) {
        this.userlists = Object.entries(o.onLineUsers)
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .chatroom
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #fff
    .top
      display flex
      justify-content space-between
      padding 15px
      height 44px
      color $color-theme
      font-size $f16
      border-1px(#dadada)
    .chatInfo
      position relative
      height calc(100% - 94px)
      overflow hidden
      li
        padding 10px 10px 0
        font-size 0
        .name
          display inline-block
          vertical-align top
          font-size $f14
          color $fc99
        .chatcontent
          // max-width: 75%
          // float right
          padding 10px 0
          font-size $f14
          padding 4px 15px
          // white-space: normal
          // word-break:break-all
          border-radius 5px
          color #fff
          background $color-title
        .services
          text-align left 
          .name
            margin-right 10px
        .self
          width 100%
          text-align right 
          .name
            margin-left 10px
    .bottom
      position fixed
      bottom 0
      display flex
      width 100%
      height 50px
      input 
        flex 1
        height 50px
      button
        flex 0 0 80px
        outline 0
        border 0
        color #fff
        background #5191d0
    .usersWraper
      position absolute
      width 100%
      height 100%
      top 0
      right 0
      background rgba(0,0,0,.25)
      z-index 1      
      .userlists
        position absolute
        right 0
        width 80% 
        height 100%  
        background #fff
        p
          height 50px
          line-height 50px
          color $fc66
          padding 0 10px
          border-1px(#dadada)
        .list
          width 100%
          height calc(100% - 50px)
          overflow hidden
          li
            padding 10px
            border-1px(#dadada)

</style>