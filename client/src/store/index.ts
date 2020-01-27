import Vue from 'vue'
import Vuex from 'vuex'
import Session from './session'

Vue.use(Vuex)
const main = new Vuex.Store({
  state: {
    layout: 'processor'
  },
  mutations: {
    SET_LAYOUT(state: any, payload: string) {
      state.layout = payload
    }
  },
  getters: {
    layout(state: any) {
      return state.layout
    }
  }
})
export default {
  main,
  Session
}
