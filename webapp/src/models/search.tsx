export default {
  namespace: 'search',
  state: {
    search: 'search'
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async searchM (payload: object, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('this:', this)
      // this.searchS(payload)
    }
  },
  reducers: {
    // handle state changes with pure functions
    searchS (state: object, payload) {
      return { ...state, payload }
    }
  }
}
