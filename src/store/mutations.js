import * as types from './mutation-types'

const mutations = {
  [types.SET_AUTHOR](state, author) {
    state.author = author
  },
  [types.SET_PRODUCTS](state, products) {
    state.products = products
  },
  [types.ADD_CARTS](state, carts) {
    state.carts = carts
  }
}

export default mutations
