import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '../services/user.service.js'
import router from '../router/index.js'

Vue.use(Vuex)

const userData = JSON.parse(localStorage.getItem('user'))
const initState = userData ? { status: { loggedIn: true }, user: userData.user } : { status: {}, user: null }

export default new Vuex.Store({
  state: {
    ...initState
  },
  getters: {
  },
  mutations: {
    loginSuccess (state, data) {
      state.status = { loggingIn: true }
      state.user = data.user
    },
    logout (state) {
      state.status = {}
      state.user = null
    }
  },
  actions: {
    registration ({ commit }, { username, password }) {
      userService.registration(username, password).then(data => {
        commit('loginSuccess', data)
        router.push('/')
      })
    },
    login ({ commit }, { username, password }) {
      userService.login(username, password).then(data => {
        commit('loginSuccess', data)
        router.push('/')
      })
    },
    logout ({ commit }) {
      userService.logout()
      commit('logout')
    }
  },
  modules: {
  }
})
