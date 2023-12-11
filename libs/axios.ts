import axios from 'axios'
import auth0 from './auth0'

const baseURL = process.env.EXPO_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(async (config) => {
  const credential = await auth0.credentialsManager.getCredentials()
  if (credential.accessToken) {
    config.headers.Authorization = `Bearer ${credential.accessToken}`
  }
  return config
})

export default axiosInstance
