import axios from 'axios'

export function getLoginInfo (url) {
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function signInUp (url, params, ...z) {
  return axios.post(url, params, z).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function signOut (url) {
  console.log(url)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
