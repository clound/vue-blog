<template>
    <div class="wecome">
        <div class="loader-inner pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { savaToLocal } from 'common/js/store'
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: 'articles'
      })
      savaToLocal('hasIn', 'welcome', true)
    }, 2000)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './wecome.styl'
</style>