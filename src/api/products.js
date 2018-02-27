import axios from 'axios'

export function getproducts(params) {
  let url = '/products/getProducts'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
