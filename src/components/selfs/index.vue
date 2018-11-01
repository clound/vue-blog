<template>
  <section class="box">
    <slider>
      <div v-for="(item, index) in recommends" :key="index">
        <img class="needsclick" :src="item.url">
      </div>
    </slider>
    <div class="content">
      <scroll @scroll="scroll"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        class="left"
        ref="listview">
        <ul>
          <li v-for="(item, index) in left" :key="index"
          :class="{'current': currentIndex === index}" @click="selectItem(index, $event)">
            <span class="left-item">{{item}}</span>
          </li>
        </ul>
      </scroll>
      <scroll @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="right"
      ref="rightlistview">
        <ul>
          <li v-for="(item, index) in right" :key="index"
          class="right-item right-item-hook" ref="listGroup">
            <h2>{{item.name}}</h2>
            <ul>
              <li v-for="(num, index) in item.content" :key="index">
                <div>{{item.name + num}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  // import { getData } from 'common/js/dom'
  export default {
    data() {
      return {
        left: ['数学', '语文', '英语', '物理', '化学', '其他'],
        right: [{
          name: '数学',
          content: ['1', '2', '3', '4', '5', '6', '7']
        }, {
          name: '语文',
          content: ['3', '4', '5', '6']
        }, {
          name: '英语',
          content: ['1', '2', '3', '4', '5', '6', '7']
        }, {
          name: '物理',
          content: ['5', '6', '7']
        }, {
          name: '化学',
          content: ['4', '5', '6', '7']
        }, {
          name: '其他',
          content: ['3', '4', '5', '6', '7']
        }],
        recommends: [{
          url: 'https://oss.dameicdn.com/uploads/5D/DD/5DDD4208CFE73F517EC1E036F89D34DB.jpg'
        }, {
          url: 'https://oss.dameicdn.com/uploads/CA/A3/CAA317B360A1EE250BBF03740BA6B138.jpg'
        }, {
          url: 'https://oss.dameicdn.com/uploads/6A/A5/6AA5AB22E5BF825C20C1A5E6A604D59B.jpg'
        }],
        currentIndex: 0,
        probeType: 3,
        listHeights: [],
        scrollY: 0,
        listenScroll: true,
        clickEvent: false
      }
    },
    mounted() {
      this._calculateHeight()
    },
    watch: {
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      }
    },
    methods: {
      selectItem(index, event) {
        // this.clickEvent = true
        console.log(index, '----')
        this._scrollTo(index)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.rightlistview.scrollToElement(this.$refs.listGroup[index], 300)
      }
    },
    components: {
      Scroll,
      Slider
    }
  }
</script>
<style lang="stylus">
.content
  display: flex
  position: absolute
  top: 200px
  bottom: 50px
  width: 100%
  overflow: hidden
  background: #eee
  .left
    flex 0 0 80px
    width 80px
    background #f3f5f7
    li
      width 100%
      height 100%
      &.current
        background red
      .left-item
        display block
        width 100%
        height 100px
        line-height 50px
        text-align center
        border-bottom 1px solid yellow
  .right
    flex 1
    .right-item
      li
        width 100%
        height 100px
        line-height 100px
        text-align center
        border-bottom 1px solid yellow
      h2
        border-bottom 1px solid blue
</style>
