import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import category from "./modules/category.js"
import dish from "./modules/dish.js"


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    category,
    dish
  },
  getters
})

export default store
