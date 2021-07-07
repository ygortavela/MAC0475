const state = () => ({
  user: {},
})

const mutations = {
  increment(state) {
    state.counter++
  },
}

const actions = {
  increment(state) {
    state.counter++
  },
}

export default { state, mutations, actions }
