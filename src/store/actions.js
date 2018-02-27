import * as types from './mutation-types'

function findIndex(carts, product) {
  return carts.findIndex((item) => {
    return item.id === product.id
  })
}

export const updateAuthor = function ({commit, state}, {author}) {
  commit(types.SET_AUTHOR, Object.assign({}, state.author, author))
}

export const updateProducts = function ({commit, state}, {products}) {
  commit(types.SET_PRODUCTS, Object.assign({}, state.products, products))
}

export const addCarts = function ({commit, state}, playload) {
  let carts = state.carts.slice()
  let fdIndex = findIndex(carts, playload)
  if (fdIndex === -1) {
    carts.push(playload)
  } else {
    carts.splice(fdIndex, 1, playload)
  }
  commit(types.ADD_CARTS, carts)
}
