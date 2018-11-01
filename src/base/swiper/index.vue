<template>
  <div class="wrapper" ref="wrapper">
    <ul class="slider" @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend="touchEnd"
    @transitionend="transitionEnd"
    :style="inner"
    ref="back">
      <li class="back-li back-li-5" :style="listitem">5-4</li>
      <li class="back-li " 
        :class="'back-li-'+item"
        v-for="(item, index) in 5"
        :key="index"
        :style="listitem">{{item}}-{{index}}</li>
      <li class="back-li back-li-1" :style="listitem">1-0</li>      
    </ul>
  </div>
</template>
<script>
export default{
  name: 'slider',
  data() {
    return {
      currentPlay: 'left',
      percent: 0,
      current: 1,
      offsetWidth: Number(`-${window.innerWidth}`)
      // inner: `${window.innerWidth * 2}px`
    }
  },
  mounted() {
    this.$refs.back.style['transform'] = `translate3d(-${window.innerWidth}px,0,0)`
  },
  computed: {
    inner() {
      return `width: ${window.innerWidth * 7}px`
    },
    listitem() {
      return `width: ${window.innerWidth}px`
    }
  },
  created() {
    this.touch = {}
    // this.init()
  },
  methods: {
    init() {
      setInterval(() => {
        this.current += 1
        this.offsetWidth = this.current * (-window.innerWidth)
        this.$refs.back.style['transform'] = `translate3d(${this.offsetWidth}px,0,0)`
        this.$refs.back.style['transition'] = 'all .3s'
      }, 3000)
    },
    transitionEnd(e) {
      console.log(33)
      if (this.current > 5) {
        this.current = 1
        this.offsetWidth = this.current * (-window.innerWidth)
        this.$refs.back.style['transition'] = 'all 0s'
        this.$refs.back.style['transform'] = `translate3d(${this.offsetWidth}px,0,0)`
      }
    },
    touchStart(e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pagey
      this.$refs.back.style['transition'] = 'all 0s'
    },
    touchMove(e) {
      console.log('move')
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pagey - this.touch.startY
      // console.log(deltaX);
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (deltaX < 0) {
        this.currentPlay = 'left'
      } else {
        this.currentPlay = 'right'
      }
      // const left = this.currentPlay === 'red' ? 0 : -window.innerWidth
      console.log(this.offsetWidth)
      let offsetWid = this.offsetWidth + deltaX
      // this.percent = Math.abs(offsetWid / window.innerWidth)
      this.$refs.back.style['transform'] = `translate3d(${offsetWid}px,0,0)`
      this.$refs.back.style['transitionDuration'] = 50
    },
    touchEnd(e) {
      if (this.currentPlay === 'left') {
        this.current += 1
        this.current = this.current > 5 ? 1 : this.current
        this.offsetWidth = this.current * (-window.innerWidth)
      } else {
        this.current -= 1
        this.current = this.current < 1 ? 5 : this.current
        this.offsetWidth = this.current * (-window.innerWidth)
      }
      console.log(this.current, this.offsetWidth)
      // console.log(this.offsetWidth)
      this.$refs.back.style['transform'] = `translate3d(${this.offsetWidth}px,0,0)`
      this.$refs.back.style['transitionDuration'] = 50
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0 auto;
  overflow: hidden;
}
.slider{
  position: absolute;
  height: 100%;
  white-space: nowrap;
  .back-li{
    position: relative;
    float: left;
    display: inline-block;
    vertical-align: top;
    height: 100%;
    text-align: center;
    font-size: 30px;
    @for $i from 1 through 5{
      &-#{$i}{
        background: random(20) * yellow
      }
    }
  }
}
</style>