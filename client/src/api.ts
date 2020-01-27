import Axios from 'axios'
import * as config from '../config.json'

const API = Axios.create({
  baseURL: config.api
})

export default API
