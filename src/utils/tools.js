/**
 * @Desc: 通用工具函数
 * （通用工具函数：即放到任何项目里都能用的）
 * （业务相关函数请放在同目录下的appTools.js里）
 * （函数请添加详细注释）
 */

/**
 * 日期时间格式化
 * @param {date} time js的date类型、时间戳、格式化后的日期格式
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'，星期为{a}
 * @param {boolean} isNeedZero 是否需要自动补零，默认true
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
function formatDate (time, format, isNeedZero = true) {
  time = time || new Date()
  // eslint-disable-next-line eqeqeq
  if (+time == time) {
    time = +time
  }
  format = format || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/')
    date = new Date(time)
  } else if (typeof time === 'number') {
    if (('' + Math.floor(time)).length === 10) time = time * 1000
    date = new Date(time)
  } else {
    date = time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (isNeedZero) {
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
    }
    return value || 0
  })
  return timeStr
}

function getCountDown (timestamp) {
  const checkTime = function (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  const secondes = parseInt(timestamp / 1000)
  const day = parseInt(secondes / 60 / 60 / 24, 10)
  const hours = parseInt(secondes / 60 / 60 % 24, 10)
  if (day > 0) {
    return `${day}天${hours}时`
  }
  const minutes = parseInt(secondes / 60 % 60, 10)
  const second = parseInt(secondes % 60, 10)
  return `${checkTime(hours)}:${checkTime(minutes)}:${checkTime(second)}`
}

/**
 * 日期格式转时间戳
 * @param {date} date js的date类型、格式化后的日期格式 2019-05-24 14:22:17
 * @return {number} 1558678937000
 */
function getTimestamp (date) {
  if (!date) {
    return +new Date()
  }
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return +new Date(date)
}

/**
 * 判断是否是NaN
 * @param {any} val 任意数据类型的数据
 * @return {boolean}
 */
function judgeNaN (val) {
  return (typeof val) === 'number' && !(val >= 0) && !(val <= 0)
}

/**
 * 对象数据过滤（过滤后端无法识别的无效值：undefined, NaN, null）
 * @param {object} obj 对象数据
 * @return {object}
 */
function filterObject (obj) {
  const isValid = (val) => {
    function judgeNaN (val) {
      return (typeof val) === 'number' && !(val >= 0) && !(val <= 0)
    }
    return val !== undefined && !judgeNaN(val) && val !== null
  }
  const newObj = {}
  Object.keys(obj).forEach(v => {
    const val = obj[v]
    if (isValid(val)) {
      newObj[v] = val
    }
  })
  return newObj
}

/**
 * 对象参数序列化（过滤undefined和NaN,自动encode）
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
function objToUrlParams (obj) {
  let str = ''
  Object.keys(obj).forEach(v => {
    const val = obj[v]
    if (val !== undefined && !judgeNaN(val)) {
      str += `${encodeURIComponent(v)}=${encodeURIComponent(val)}&`
    }
  })
  return str.slice(0, -1)
}

/**
 * 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
function getQueryObject (url) {
  url = url || window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 函数防抖
 * @param {function} fn 函数
 * @param {number} t 等待时间（毫秒）
 * @return {function}
 */
function debounce (fn, t) {
  let timeId
  let delay = t || 500
  return function () {
    let args = arguments
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} t 间隔时间（毫秒）
 * @return {function}
 */
function throttle (fn, t) {
  let timeId
  let firstTime = true
  let interval = t || 500
  return function () {
    let args = arguments
    if (firstTime) {
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timeId) {
      return
    }
    timeId = setTimeout(() => {
      clearTimeout(timeId)
      timeId = null
      fn.apply(this, args)
    }, interval)
  }
}

/**
 * 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
function getDataType (data) {
  const str = Object.prototype.toString.call(data)
  return str.match(/\s(\w*)\]/)[1].toLowerCase()
}

/**
 * 数字千分化
 * @param {number} num 数字
 * @return {string} 10,000
 */
function toThousands (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 字符串超出长度用...表示
 * @param {string} str 字符串
 * @param {number} maxLen 最大长度
 * @return {string}
 */
function omitText (str, maxLen) {
  if (!str) {
    return ''
  }
  maxLen = maxLen || str.length
  if (str.length > maxLen) {
    str = str.slice(0, maxLen) + '...'
  }
  return str
}

/**
 * @description: 判断是否支持storage存储（区分无痕模式）
 * @return {boolean}
 */
function isStorageSupported () {
  const testKey = 'testIsStorageSupported'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, 'testValue')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    console.warn('storage is not supported')
    return false
  }
}

/**
 * @description: 自定义的setInterval函数（使用setTimeout代替实现，性能更好）
 * @param {function} fn 回调函数
 * @param {number} delay 延时，毫秒
 * @return {object} timer 调用timer.clear()可以清除该定时器
 */
function setMyInterval (fn, delay) {
  let timeId = null
  const intervalFn = () => {
    timeId = setTimeout(() => {
      intervalFn()
      fn.call(window)
    }, delay)
  }
  intervalFn()

  const timer = {
    clear: () => { clearTimeout(timeId) }
  }
  return timer
}

export default {
  // 日期时间格式化
  formatDate,
  // 倒计时
  getCountDown,
  // 日期格式转时间戳
  getTimestamp,
  // 判断是否是NaN
  judgeNaN,
  // 对象数据过滤
  filterObject,
  // 对象参数序列化
  objToUrlParams,
  // 获取地址参数
  getQueryObject,
  // 创建唯一的字符串
  createUniqueString,
  // 函数防抖
  debounce,
  // 函数节流
  throttle,
  // 获取数据类型
  getDataType,
  // 数字千分化
  toThousands,
  // 字符串超出长度用...表示
  omitText,
  // 判断是否支持storage存储
  isStorageSupported,
  // 自定义的setInterval函数
  setMyInterval,
}
