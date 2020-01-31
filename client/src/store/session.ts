import Vue from 'vue';
import Vuex from 'vuex';
import API from '../api';

Vue.use(Vuex)

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  character: '',
  error: '',
  account: '',
  login: '',
  banned: ''
}
const getters = {
  isLoggedIn(state: any) {
    return !!state.token
  },
  authStatus(state: any) {
    return state.status
  }
};
const actions = {
  load: async (context: any) => {
    try {
      await context.commit('loadSession')
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  login: async (commit: any, user: any) => {
    try {
      localStorage.setItem('login_info', JSON.stringify({ mail: user.mail, password: user.password }))
      let result = await API.post('/authentication/login', user);
      if (result.data.error) {
        commit.commit("errors", result.data.error);
        return Promise.reject(Error(result.data.error))
      }
      let session = {
        status: true,
        token: result.data.token,
        account: commit.state.account,
        character: result.data.character
      }

      localStorage.setItem('token', session.token)
      localStorage.setItem('characters', JSON.stringify(result.data.characters))
      API.defaults.headers.common['Authorization'] = session.token
      commit.commit("errors", '');
      commit.commit('auth_success', session)

      return Promise.resolve()
    } catch (e) {
      commit.commit("errors", e);
      return Promise.reject(e)
    }
  },
  logout(commit: any) {
    commit.commit('logout')
    localStorage.removeItem('token')
    delete API.defaults.headers.common['Authorization'];
  },
  register: async (commit: any, user: any) => {
    try {
      let result = await API.post('/authentication/register', user);
      if (result.data.error) {
        commit.commit("errors", result.data.error);
        return Promise.reject(Error(result.data.error))
      }
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  register_character: async (commit: any, user: any) => {
    try {
      localStorage.setItem('login_info', JSON.stringify({ mail: user.mail, password: user.password }))
      console.log(commit.state.account)
      let result = await API.post('/authentication/register/character', user);
      if (result.data.error) {
        commit.commit("errors", result.data.error);
        return Promise.reject(Error(result.data.error))
      }
      let session = {
        status: true,
        token: result.data.token,
        account: commit.state.account,
        character: result.data.character
      }
      localStorage.setItem('token', session.token)
      API.defaults.headers.common['Authorization'] = session.token
      localStorage.setItem('characters', JSON.stringify(result.data.characters))
      commit.commit("errors", '');
      commit.commit('auth_success', session)
      return Promise.resolve()
    } catch (e) {
      commit.commit("errors", e);
      return Promise.reject(e)
    }
  },
  switchCharacter: async (commit: any, user: any) => {
    try {
      let result = await API.post('/session/characters/switch', user);
      if (result.data.error.banned) {
        commit.commit('banned', result.data.banned)
      }
      let session = {
        status: true,
        token: result.data.token,
        account: commit.state.account,
        character: result.data.character
      }
      localStorage.setItem('token', session.token)
      API.defaults.headers.common['Authorization'] = session.token
      localStorage.setItem('characters', JSON.stringify(result.data.characters))
      await commit.commit("setUser", result.data.character);
      return Promise.resolve()
    } catch (e) {
      commit.commit("errors", e);
      return Promise.reject(e)
    }
  },
  create_character: async (commit: any, user: any) => {
    try {
      console.log(commit.state.account)
      let result = await API.post('/session/characters/create', user);
      if (result.data.error) {
        commit.commit("errors", result.data.error);
        return Promise.reject(Error(result.data.error))
      }
      let session = {
        status: true,
        token: result.data.token,
        account: commit.state.account,
        character: result.data.character
      }
      localStorage.setItem('token', session.token)
      API.defaults.headers.common['Authorization'] = session.token
      localStorage.setItem('characters', JSON.stringify(result.data.characters))
      commit.commit("errors", '');
      commit.commit('auth_success', session)
      await commit.commit("setUser", session.character);
      return Promise.resolve()
    } catch (e) {
      commit.commit("errors", e);
      return Promise.reject(e)
    }
  }
};
const mutations = {
  setUser(state: any, data: any) {
    state.character = data
  },
  auth_request(state: any) {
    state.status = 'loading';
  },
  auth_success(state: any, data: any) {
    state.status = 'success';
    state.token = data.token;
    state.account = data.account;
    state.character = data.character;
  },
  auth_error(state: any) {
    state.status = 'error';
  },
  logout(state: any) {
    state.status = '';
    state.token = '';
  },
  errors(state: any, value: string) {
    state.error = value
  },
  banned(state: any, value: string) {
    state.banned = value
  }
};
const Session = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default Session
