import { init } from '@rematch/core'

import search from './search'
import user from './user'

const store = init({
  models: {
    search,
    user
  }
})

export default store
