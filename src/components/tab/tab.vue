<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/articles">
      <i class="iconfont icon-shouye-shouye"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/posts">
      <i class="iconfont icon-dingzhi"></i>
      <span class="tab-link">发表</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/evaluate">
      <i class="iconfont icon-lianxiwomen"></i>
      <span class="tab-link">评论
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/my">
      <i class="iconfont icon-ren-xuanzhong"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    position:fixed
    width: 100%
    height: 50px
    bottom: 0
    display: flex
    font-size: $f12
    background: #fff
    box-shadow 0 3px 8px rgba(0,0,0,.15)
    border-top: 1px solid #eee
    z-index 100
    .tab-item
      flex: 1
      text-align: center
      >i 
       display block
       margin-top 10px
      .tab-link
        display block
        margin-top 5px
        padding-bottom: 5px
        color: $fc33
      &.router-link-active
        >i,.tab-link
          color: $color-theme
</style>