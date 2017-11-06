<template>
  <div class="publishCon">
    <form action="" method="post">
      <h4>标题 <i class="red">*</i></h4>
      <input type="text" class="title"
      v-model="form.title">
      <h4>内容 <i class="red">*</i></h4>
      <textarea name="" id="" cols="30" rows="10" 
      v-model="form.content"></textarea>
      <input type="submit" class="btn" @click="_post($event)">
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
import {postArticles} from 'api/articles'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    _post (event) {
      event.preventDefault()
      postArticles(this.form).then((res) => {
        if (res.code === ERR_OK) {
          this.$router.push('/')
        } else {
          this.$alert(res.info)
        }
      })
    }
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