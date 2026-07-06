import axios from 'axios'
import { APP_CONFIG } from '@/constants/appConfig'
import { store } from '@/app/store/store'
import { showSnackbar } from '@/app/store/slices/uiSlice'

const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

const notifyApiError = (message) => {
  if (!message) return
  try {
    store.dispatch(showSnackbar({ message, severity: 'error' }))
  } catch (err) {
    console.error('Failed to dispatch API error snackbar', err)
  }
}

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
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const message = 'Request timed out. Please try again.'
      notifyApiError(message)
      return Promise.reject({ message, code: 'TIMEOUT' })
    }

    if (!error.response) {
      const message = 'Network error. Please check your connection.'
      notifyApiError(message)
      return Promise.reject({ message, code: 'NETWORK_ERROR' })
    }

    const { status, data } = error.response
    const apiMessage = data?.message || data?.error || null
    let message = apiMessage || 'An unexpected error occurred.'
    let code = 'UNKNOWN_ERROR'

    if (status === 400) {
      message = apiMessage || 'Invalid request. Please verify your input.'
      code = 'BAD_REQUEST'
    } else if (status === 401) {
      window.dispatchEvent(new CustomEvent('auth:session-expired'))
      message = apiMessage || 'Unauthorized. Your session may have expired.'
      code = 'UNAUTHORIZED'
    } else if (status === 403) {
      message = apiMessage || 'You do not have permission to perform this action.'
      code = 'FORBIDDEN'
    } else if (status === 404) {
      message = apiMessage || 'The requested resource was not found.'
      code = 'NOT_FOUND'
    } else if (status === 408) {
      message = 'Request timed out. Please try again.'
      code = 'TIMEOUT'
    } else if (status >= 500) {
      message = apiMessage || 'A server error occurred. Please try again later.'
      code = 'SERVER_ERROR'
    }

    notifyApiError(message)
    return Promise.reject({ message, code })
  }
)

export default apiClient
