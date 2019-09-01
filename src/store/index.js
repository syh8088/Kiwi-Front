import Vue from 'vue'
import Vuex from 'vuex'
import service from '../service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    user: null
  },
  getters: {
    isAuthenticated (state) {
      if(localStorage.accessToken) {
        state.accessToken = localStorage.accessToken
      }
      let result = false
      if(state.accessToken) {
        result = true
      }
      return result
    },
    isUser(state) {
      if(localStorage.user != null && localStorage.user !== 'undefined') {
        state.user = JSON.parse(localStorage.user)
      }
      return state.user
    }
  },
  mutations: {
    LOGIN (state, data) {
      state.accessToken = data.access_token;
      delete localStorage.accessToken;
      localStorage.accessToken = data.access_token
    },
    LOGOUT (state) {
      state.user = null;
      state.accessToken = null;
      delete localStorage.user;
      delete localStorage.accessToken
    },
    USER(state, data) {
      state.user = data;
      localStorage.user = JSON.stringify(data);
      state.closetCount = data.wardrobeViewerCount || 0;
      localStorage.closetCount = data.wardrobeViewerCount || 0;
    }
  },
  actions: {
    LOGIN ({commit}, data) {
      console.log(data);
      return service.getToken(data).then(response => {
        console.log(response);
        if(response.status === 200 || response.status === 204) {
          commit('LOGIN', response.data)
          return response
        }
      }).catch(e => {
        return e.response
      })
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    /*  return service.getMe(false).then(response => {
        if(response.status === 200 || response.status === 204) {
          //if(response.data.r !== 'NO_DATA') {
          if(!response.data) {
            commit('USER', response.data)
            return response
          }
        }
      }).catch(e => {
        return e.response
      })*/
    },
    USER({commit}, auth) {
      /*return service.getMe(auth).then(response => {
        if(response.status === 200 || response.status === 204) {
          commit('USER', response.data);
          return response
        }
      }).catch(e => {
        return e.response
      })*/
    }
  }
})
