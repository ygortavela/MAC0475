const state = () => ({
  accessToken: '',
})

const mutations = {
  MUTATE_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
}

const actions = {
  mutateAccessToken({ commit }, payload) {
    commit('MUTATE_ACCESS_TOKEN', payload)
  },
}

const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
}

export default { state, mutations, actions, getters }
