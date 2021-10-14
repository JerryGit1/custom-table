export function deepCopy(params) {
  // 排除掉null和undefined
  if (![null, undefined].some(item => params === item)) {
    const type = Object.prototype.toString.call(params).slice(8, -1)
    if (type === 'Object') {
      const temp = {}
      Object.entries(params).forEach(([key, value]) => Reflect.set(temp, key, deepCopy(value)))
      return temp
    } else if (type === 'Array') {
      return params.map(arrayItem => deepCopy(arrayItem))
    }
  }
  return params
}

export function getQuery() {
  return window.location.search
    .slice(1)
    .split('&')
    .reduce((data, item) => {
      const [key, value] = item.split('=')
      data[key] = value
      return data
    }, {})
}

export const Query = getQuery()

export function createDom(h, params) {
  return params.map(item => {
    const func = []
    func.push(item.elName)
    func.push(item.props)
    if (item.children) func.push([this.createDom(h, item.children)])
    return h(...func)
  })
}

export function checkFormValid(vue, formName = 'mainForm') {
  let result
  vue.$refs[formName].validate(valid => {
    result = valid
  })
  return result
}

export function isArrayNumEqual(source, target) {
  if (!Array.isArray(source)) {
    return new Error('source is not Array')
  }
  if (!Array.isArray(target)) {
    return new Error('target is not Array')
  }
  source = source.sort()
  target = target.sort()
  return source.every((item, index) => item === target[index])
}

export function evil(fn) {
  const Fn = Function
  return new Fn('return ' + fn)()
}

const common = {
  deepCopy,
  getQuery,
  Query,
  createDom,
  checkFormValid,
  isArrayNumEqual,
  evil
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$common', {
      value: common
    })
  }
}
