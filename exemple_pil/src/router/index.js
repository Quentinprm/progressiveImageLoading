import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SingleImage from '@/components/SingleImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/singleImage/:src',
      name: 'SingleImage',
      props: true,
      component: SingleImage
    }
  ]
})
