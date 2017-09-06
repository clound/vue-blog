<template>
  <div class="publishCon">
    <form action="" method="post">
      <h4>标题 <i class="red">*</i></h4>
      <input type="text" class="title">
      <h4>内容 <i class="red">*</i></h4>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <input type="submit" class="btn">
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .publishCon
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
</style>