// blob转base64
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    // 开始转
    reader.onload = () => {
      fileResult = reader.result
    }
    // 转 失败
    reader.onerror = error => {
      reject(error)
    }
    // 转 结束
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}

// url转base64
export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0)
      // result
      const result = canvas.toDataURL('image/png')
      resolve(result)
    }
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = url
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('urlToBase64 error'))
    }
  })
}

// base6转blob
export function base64ToBlob({ b64data = '', contentType = '', sliceSize = 512 } = {}) {
  return new Promise(resolve => {
    // 使用 atob() 方法将数据解码
    const byteCharacters = atob(b64data)
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = []
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i))
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers))
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`
    })
    resolve(result)
  })
}
