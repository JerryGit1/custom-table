/**
 * 回显树对所有节点进行过滤，只获取最末级选中的节点集合(childNodes)和key值集合(childKeys)
 * @param {Array} data 树的数据
 * @param {string} nodeOrKey 获取树的节点数据还是key值数据: 传'node'即获取节点集合，传'key'即获取key值集合
 * @param {string} keyName 树节点key属性
 * @param {string} childName 树的子节点属性
 * @param {Boolean} checkStatus 树节点选中状态属性
 * @returns {Array} 第二个参数为'node',返回值为节点集合,否则返回值为key值集合(默认返回节点集合)
 */
export const getChild = (data, nodeOrKey, keyName, childName, checkStatus) => {
  const childNodes = []
  const childKeys = []
  if (!data) {
    return
  }
  if (!nodeOrKey) {
    nodeOrKey = 'key'
  }
  if (!keyName) {
    keyName = 'id'
  }
  if (!childName) {
    childName = 'children'
  }
  if (!checkStatus) {
    checkStatus = 'checked'
  }
  const getChild = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][childName] && arr[i][childName].length > 0) {
        getChild(arr[i][childName])
      } else {
        if (arr[i][checkStatus]) {
          childNodes.push(arr[i])
          childKeys.push(arr[i][keyName])
        }
      }
    }
    if (nodeOrKey === 'key') {
      return childKeys
    } else {
      return childNodes
    }
  }
  return getChild(data)
}

/**
 * 修改角色权限时，对已经选中所有级别节点进行过滤，返回过滤掉第一级系统后的数据和key值集合(权限系统特殊需求)
 * @param {Array} data 树的数据
 * @param {string} nodeOrKey 获取树的节点数据还是key值数据: 传'node'即获取节点集合，传'key'即获取key值集合
 * @param {string} keyName 树节点key属性
 * @param {string} childName 树的子节点属性
 * @param {Boolean} checkStatus 树节点选中状态属性
 * @returns {Array} 第二个参数为'node',返回值为节点集合,否则返回值为key值集合(默认返回节点集合)
 */
// 修改角色权限时，对已经选中的节点进行筛选，过滤掉第一级系统的数据
export const getCheckList = (data, nodeOrKey, levelName, keyName) => {
  const temp = []
  if (!data) {
    return
  }
  if (!nodeOrKey) {
    nodeOrKey = 'key'
  }
  if (!keyName) {
    keyName = 'id'
  }
  if (!levelName) {
    levelName = 'level'
  }
  const getChild = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][levelName].toString() !== '1') {
        if (nodeOrKey === 'key') {
          temp.push(arr[i][keyName])
        } else {
          temp.push(arr[i])
        }
      }
    }
    return temp
  }
  return getChild(data)
}

/**
 * 处理树数据,树节点第一级系统如果没有children则disabled
 * @param {Array} data 树的数据
 * @param {string} childName 树的子节点属性
 * @returns {Array}
 */
export const resetTreeData = (data, childName) => {
  if (!data) {
    return
  }
  if (!childName) {
    childName = 'children'
  }
  data.forEach(val => {
    if (!val[childName]) {
      val.disabled = true
    }
  })
  return data
}
