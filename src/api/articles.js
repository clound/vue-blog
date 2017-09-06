import axios from 'axios'

export function getArticles () {
  const url = '/posts/getArticles'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
