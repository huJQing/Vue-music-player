import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutation'
import * as getters from './getters'
import state from './state'
import * as actions from './action'


const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})

export default store