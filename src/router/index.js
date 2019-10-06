import Vue from 'vue'
import Router from 'vue-router'
import Backstage from '@/views/backstage'
import Category from '@/views/backstage/category'
import CategoryAddition from '@/views/backstage/category/addition'
import Dish from '@/views/backstage/dish'
import DishAddition from '@/views/backstage/dish/addition'
import Test from '@/views/test'
import Test2 from '@/views/test/index2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Backstage',
      component: Backstage
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/addition',
      name: 'CategoryAddition',
      component: CategoryAddition
    },
    {
      path: '/dish',
      name: 'Dish',
      component: Dish
    },
    {
      path: '/dish/addition',
      name: 'DishAddition',
      component: DishAddition
    },
     {
      path: '/test',
      name: 'Test',
      component: Test
    },
     {
      path: '/test2',
      name: 'Test2',
      component: Test2
    }
  ]
})
