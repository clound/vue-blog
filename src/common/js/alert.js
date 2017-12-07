import Vue from 'vue'
import {remove, html, addClass} from 'common/js/dom'
/**
 * 全局弹框
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
    Vue.prototype.$fadeMsg = (msg) => {
      let $fadeMsgAlert = document.getElementById('fadeMsg')
      let $body = document.body
      if ($fadeMsgAlert) {
        remove($fadeMsgAlert)
      }
      html($body, `<div class="fadeTip" id="fadeMsg">
                    <i class="iconfont icon-duihao1 fadeMsgIcon"></i>
                    <span class="fadeTipCon">${msg}</span>
                  </div>`)
      let $fadeMsg = document.getElementById('fadeMsg')
      addClass($fadeMsg, 'fadeMsg-show')
      clearTimeout(timer)
      timer = setTimeout(() => {
        remove($fadeMsg)
      }, 2000)
    }
  }
}
