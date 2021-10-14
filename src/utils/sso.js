import querystring from 'querystring'
import { getLoginUrl, autologin } from '@/api/login'
import { setToken } from '@/utils/auth'
import { setStore } from '@/utils/store'

const href = window.location.origin

async function loginOrRedirectToLogin() {
  const { session_state, code } = querystring.parse(window.location.search.substr(1))
  if (session_state && code) {
    // 登录获取token及用户信息
    const data = await autologin(code, href)
    const { token: token } = data
    console.info(data)
    // 用户信息
    setStore('userInfo', data)
    setToken(token)
    // eslint-disable-next-line require-atomic-updates
    window.location.href = href
  } else {
    await redirectToLogin()
  }
}

// 重定向到SSO登录页面
function redirectToLogin() {
  return new Promise(resolve => {
    getLoginUrl({ redirectUri: href }).then(data => {
      window.location.href = data
      resolve()
    })
  })
}

export { loginOrRedirectToLogin }
