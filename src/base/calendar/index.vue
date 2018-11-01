<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
        <li class="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color:red">六</li>
      <li style="color:red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li  v-for="(dayobject, index) in days" :key="index">
        <!--本月-->
        <!--如果不是本月  改变类名加灰色-->
        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
        <!--如果是本月  还需要判断是不是这一天-->
        <span v-else @click="showCurrent(dayobject.day)">
        <!--今天  同年同月同日-->
          <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
          <span v-else>{{ dayobject.day.getDate() }}</span>
          <p>{{dayobject.price}}</p>
        </span>
      </li>
    </ul>
</div>
</template>
<script>
  export default {
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        info: [
          { date: '2018-09-15', price: '100' },
          { date: '2018-09-20', price: '110' },
          { date: '2018-10-20', price: '120' }
        ],
        sortedData: {}
      }
    },
    created() {
      this.sortData()
      this.initData(null)
    },
    methods: {
      initData(cur) {
        // let leftcount = 0 // 存放剩余数量
        let date
        if (cur) {
          date = new Date(cur)
        } else {
          let now = new Date()
          let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
          d.setDate(35)
          date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        }
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1

        this.currentWeek = date.getDay() // 1...6,0
        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        // 初始化本周
        for (let i = this.currentWeek - 1; i >= 0; i--) {
          let d = new Date(str)
          d.setDate(d.getDate() - i)
          // console.log(d)
          let price = this.checkData(d)
          let dayobject = {
            price
          } // 用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d
          this.days.push(dayobject) // 将日期放入data 中的days数组 供页面渲染使用
        }
        // 其他周
        for (let i = 1; i <= 35 - this.currentWeek; i++) {
          let d = new Date(str)
          d.setDate(d.getDate() + i)
          let price = this.checkData(d)
          let dayobject = {
            price
          }
          dayobject.day = d
          this.days.push(dayobject)
        }
      },
      pickPre(year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        let d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), (d.getMonth() + 1), 1))
      },
      pickNext(year, month) {
        let d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), (d.getMonth() + 1), 1))
      },
      pickYear(year, month) {
        alert(year + ',' + month)
      },
      showCurrent(dayobj) {
        alert(dayobj.getFullYear() + '-' + (dayobj.getMonth() + 1) + '-' + dayobj.getDate())
      },
      sortData() {
        let _ele, _eleDate, _innerYear, _innerMonth, _innerDay
        this.info.forEach((ele, index) => {
          _ele = ele.date
          _eleDate = new Date(_ele)
          _innerYear = _eleDate.getFullYear()
          _innerMonth = _eleDate.getMonth() + 1
          _innerDay = _eleDate.getDate()
          if (!this.sortedData[_innerYear]) this.sortedData[_innerYear] = {}
          if (!this.sortedData[_innerYear][_innerMonth]) this.sortedData[_innerYear][_innerMonth] = {}
          if (!this.sortedData[_innerYear][_innerMonth][_innerDay]) {
            this.sortedData[_innerYear][_innerMonth][_innerDay] = ele
          } else {
            let _tempEle = this.sortedData[_innerYear][_innerMonth][_innerDay]
            this.sortedData[_innerYear][_innerMonth][_innerDay] =
                _tempEle.price > ele.price ? ele : _tempEle
          }
        })
      },
      checkData(theDate) {
        let _eleDate = new Date(theDate),
          _eleDateyear = _eleDate.getFullYear(),
          _eleDatemon = _eleDate.getMonth() + 1,
          _eleDateday = _eleDate.getDate()
        let _curMonthData = this.sortedData[_eleDateyear] && this.sortedData[_eleDateyear][_eleDatemon] || {},
          _renderPrice = _curMonthData[_eleDateday] && _curMonthData[_eleDateday].price || ''
        return _renderPrice
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate(year, month, day) {
        let y = year
        let m = month
        if (m < 10) m = '0' + m
        let d = day
        if (d < 10) d = '0' + d
        return y + '-' + m + '-' + d
      }
    }
  }
</script>
<style lang="scss" scoped>
#calendar{
    width:80%;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
}
.month {
    width: 100%;
    background: #00B8EC;
}
.month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
}
.year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.year-month:hover {
    background: rgba(150, 2, 12, 0.1);
}
.choose-year {
    padding-left: 20px;
    padding-right: 20px;
}
.choose-month {
    text-align: center;
    font-size: 1.5rem;
}
.arrow {
    padding: 30px;
}
.arrow:hover {
    background: rgba(100, 2, 12, 0.1);
}
.month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}
.weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
}
.weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
}
.days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 1rem;
    color: #000;
}
.days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
}
.days li .other-month {
    padding: 5px;
    color: gainsboro;
}
.days li:hover {
    background: #e1e1e1;
}
</style>
