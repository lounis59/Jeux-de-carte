import { createStore } from 'vuex'

export default createStore({
  state: {
    player: null || JSON.parse(localStorage.getItem('player')),
    jeuxDeCarte: []

  },
  getters: {
    cartes: state => state.jeuxDeCarte
  },
  mutations: {
    restorePlayer (state) {
      state.player = JSON.parse(localStorage.getItem('player'))
    },
    saveJeuxDeCarte (state,jeux) {
      state.jeuxDeCarte = jeux
    }
  },
  actions: {
    resetPlayer ({commit}) {
      commit('restorePlayer')
    },
    addJeuxDeCarte ({commit}, jeux) {
      commit('saveJeuxDeCarte', jeux)
    }
  },
  modules: {
  }
})
