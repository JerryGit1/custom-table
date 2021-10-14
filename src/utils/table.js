// 回显树对节点进行过滤，只获取最末级选中的节点id集合
export const toFlexVal = (width, minWidth) => {
  if (minWidth) {
    return `1 0 ${minWidth}px`
  } else if (width) {
    return `0 0 ${width}px`
  }
  return '1 0 80px' // 默认值
}
