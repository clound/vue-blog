import * as types from './mutation-types'

export const updateAuthor = function ({commit, state}, {author}) {
  // console.log(author)
  commit(types.SET_AUTHOR, Object.assign({}, state.author, author))
}
