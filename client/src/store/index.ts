import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'
import Session from './session'

Vue.use(Vuex)
const main = new Vuex.Store({
  state: {
    layout: 'processor',
    settings: null,
    client: false,
    loading: true,
    subHeader: false
  },
  mutations: {
    SET_LAYOUT(state: any, payload: string) {
      state.layout = payload
    },
    setSettings(state: any, payload: string) {
      state.settings = payload
    },
    setClient(state: any, payload: boolean) {
      state.client = payload
    },
    setLoading(state: any, payload: boolean) {
      state.loading = payload
    },
    setSubHeader(state: any, payload: any) {
      state.subHeader = payload;
    }
  },
  getters: {
    layout(state: any) {
      return state.layout
    },
    settings(state: any) {
      return state.settings
    }
  },
  actions: {
    async loadSettings(state: any) {
      if (state.settings == null) {
        let response = await API.get('/settings')
        state.commit("setSettings", response.data)
      }
    }
  }
})
export default {
  main,
  Session
}
