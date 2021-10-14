import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import { removeStore } from '@/utils/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  responseType: 'blob'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken() // JSON.parse(getToken()).token
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const {
      status,
      data,
      message,
      headers: { filename }
    } = response
    const msg = message
    /** 服务器判断 */
    if (status === 200) {
      /** 接口逻辑判断 */
      if (!filename) {
        removeToken()
        removeStore('userInfo')
        location.reload()
      } else {
        const reg = /\\/g
        const fileName = decodeURI(filename).replace(reg, '')
        downloadFile(data, fileName)
      }
    } else {
      Message({
        message: msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  error => {
    // const code = Number(error.response.status)
    // if (code === 403 || code === 405) {
    //   removeToken()
    //   removeStore('userInfo')
    //   location.reload()
    // }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const downloadFile = (data, fileName) => {
  const a = document.createElement('a')

  a.download = decodeURIComponent(fileName)
  a.href = window.URL.createObjectURL(data)
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}

export default service
