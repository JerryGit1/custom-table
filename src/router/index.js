import Vue from 'vue'
import Router from 'vue-router'
import list from '@/views/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    }
  ]
})
