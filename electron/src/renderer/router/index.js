import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: require('@/pages/Menu').default
    },
    {
      path: '/game',
      name: 'game',
      component: require('@/pages/Game').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
