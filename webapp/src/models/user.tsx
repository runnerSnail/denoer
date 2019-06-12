interface StoreState {
  user_id?: number,
  user_name?: string,
  user_img?: string,
  gitlab_id?: string,
  add_time?: string,
  gitlab_url?: string,
  company?: string,
  loaction?: string,
  email?: string,
  followers?: string
}
const initState = {
  user_name: '',
  user_img: '',
  gitlab_id: '',
  add_time: '',
  gitlab_url: '',
  company: '',
  loaction: '',
  email: '',
  followers: ''
}

export default {
  namespace: 'user',
  state: {
    ...initState
  },
  effects: {
    async updateUserInfo (payload: object = {}, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.updateState({ ...payload })
    }
  },
  reducers: {
    // handle state changes with pure functions
    updateState (state: StoreState = initState, payload):StoreState {
      return { ...state, ...payload }
    }
  }
}
