import Cookies from 'js-cookie'

export const setStore = (key, value) => Cookies.set(key, JSON.stringify(value))
export const getStore = key => (Cookies.get(key) ? JSON.parse(Cookies.get(key)) : {})
export const removeStore = key => Cookies.remove(key)
