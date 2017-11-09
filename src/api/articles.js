import axios from 'axios'

export function getArticles() {
  const url = '/posts/getArticles'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function postArticles(params) {
  const url = '/posts/postArticles'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getEachArticle(params) {
  const url = '/posts/' + params
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function postComment(params) {
  const url = '/posts/' + params.postId + '/comment'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function removeArticle(params) {
  const url = '/posts/' + params + '/remove'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function removeLeaveMsg(params) {
  const url = '/posts/' + params.postId + '/comment/' + params.commentId + '/remove'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
