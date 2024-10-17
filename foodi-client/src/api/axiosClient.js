import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:6001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
