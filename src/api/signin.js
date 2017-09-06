import axios from 'axios'

export function signInUp (url, params, ...z) {
  console.log(params, z)
  return axios.post(url, params, z).then((res) => {
    return Promise.resolve(res.data)
  })
}
