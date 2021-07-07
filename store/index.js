const state = () => ({
  user: {
    name: '',
    email: '',
    accessToken: '',
  },
})

const mutations = {
  MUTATE_USER(state, user) {
    state.user.name = user.name
    state.user.email = user.email
    state.user.accessToken = user.accessToken
  },
}

const actions = {
  mutateUser({ commit }, payload) {
    commit('MUTATE_USER', payload)
  },
}

export default { state, mutations, actions }
