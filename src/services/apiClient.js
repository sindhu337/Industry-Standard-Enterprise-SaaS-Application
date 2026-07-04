import axios from 'axios'
import { APP_CONFIG } from '@/constants/appConfig'

const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(
  (config) => {
    const persisted = localStorage.getItem('persist:egrcp-auth')
    if (persisted) {
      const parsed = JSON.parse(persisted)
      const auth = parsed.auth ? JSON.parse(parsed.auth) : null
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: 'Network error. Please check your connection.', code: 'NETWORK_ERROR' })
    }

    const { status } = error.response

    if (status === 401) {
      window.dispatchEvent(new CustomEvent('auth:session-expired'))
    }

    if (status === 403) {
      return Promise.reject({ message: 'You do not have permission to perform this action.', code: 'FORBIDDEN' })
    }

    if (status >= 500) {
      return Promise.reject({ message: 'A server error occurred. Please try again later.', code: 'SERVER_ERROR' })
    }

    return Promise.reject(error.response.data || { message: 'An unexpected error occurred.' })
  }
)

export default apiClient
