import Axios from 'axios'
import { Config } from '../config'

const API = Axios.create({
  baseURL: Config.api
})

export default API
