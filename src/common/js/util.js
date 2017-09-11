function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function setCookie (name, value, iDay) {
  var oDate = new Date()
  oDate.setDate(oDate.getDate() + iDay) // 用来设置过期时间用的，获取当前时间加上传进来的iDay就是过期时间
  document.cookie = `${name}=${value};expires=${oDate}`
}

export function getCookie (name) {
  var arr = document.cookie.split(';')  // 多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
  for (var i = 0; i < arr.length; i++) {     // 历遍数组
    console.log(arr)
    var arr2 = arr[i].split('=')        // 原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon
    if (arr2[0].replace(/(^\s*)|(\s*$)/g, '') === name) { // 如果数组的属性名等于传进来的name
      return arr2[1]           // 就返回属性名对应的值
    }
  }
  return // 没找到就返回空
}

export function removeCookie (name) {
  setCookie(name, 1, -1) // -1就是告诉系统已经过期，系统就会立刻去删除cookie
}
