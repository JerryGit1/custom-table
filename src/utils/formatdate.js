/* 时间处理 */

/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
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
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} format 格式
 * @param {int} timestamp 要格式化的时间 默认为当前时间
 * @return {string}   格式化的时间字符串
 * 使用：  dateHandle('1350052653', 'Y-M-D');    //很方便的将时间戳转换成了2012-10-11
 dateHandle('1350052653', 'Y-M-D h:m:s');    //得到的结果是2012-10-12 22:37:33
 */
export const dateHandle = (number, format) => {
  const time = new Date(number)
  const newArr = []
  const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (const i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 字符串转时间戳
export const getTimeStamp = timeStr => {
  return new Date(timeStr).getTime()
}

// 时间 + 天数 = 时间
export const getNewData = (dateTemp, days) => {
  const nDate = new Date(dateTemp) // 格式化时间
  const millSeconds = Math.abs(Number(nDate)) + Number(days) * 24 * 60 * 60 * 1000
  return dateHandle(millSeconds, 'Y-M-D')
}

// 时间 - 时间 = 天数
export const GetNumberOfDays = (date1, date2) => {
  // 获得天数
  // date1：开始日期，date2结束日期
  const a1 = Date.parse(new Date(date1))
  const a2 = Date.parse(new Date(date2))
  return parseInt((a2 - a1) / (1000 * 60 * 60 * 24)) // 核心：时间戳相减，然后除以天数
}

// 时间字符串比大小
export const dataStringMax = (date1, date2) => {
  // 获得天数
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  if (d1 < d2) {
    return false
  }
  return true
}
