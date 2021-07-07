const state = () => ({
  user: {
    name: '',
    accessToken: '',
  },
})

const mutations = {
  MUTATE_USER(state, user) {
    state.user.name = user.name
    state.user.accessToken = user.accessToken
  },
}

const actions = {
  mutateUser({ commit }, payload) {
    console.log(payload)
    commit('MUTATE_USER', payload)
  },
}

export default { state, mutations, actions }
