import Vue from 'vue'
import {remove, html, addClass} from 'common/js/dom'
/**
 * 全局报错弹框
 */
export default {
  install () {
    let timer = null
    Vue.prototype.$alert = (msg) => {
      let $errorAlert = document.getElementById('errorAlert')
      let $body = document.body
      if ($errorAlert) {
        remove($errorAlert)
      }
      html($body, `<div class="error-alert" id="errorAlert">
                    <i class="iconfont icon-warning errorAlertIcon"></i>
                    <span class="errorAlertCon">${msg}</span>
                  </div>`)
      let $alert = document.getElementById('errorAlert')
      addClass($alert, 'alert-show')
      clearTimeout(timer)
      timer = setTimeout(() => {
        remove($alert)
      }, 2000)
    }
  }
}
