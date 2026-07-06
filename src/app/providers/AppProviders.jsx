import { useMemo, useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CssBaseline, Snackbar, Alert } from '@mui/material'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { store, persistor } from '@/app/store/store'
import { lightTheme, darkTheme } from '@/theme/theme'
import { hideSnackbar, showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'

function ThemeWrapper({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const themeMode = useSelector((state) => state.ui.themeMode)
  const { open, message, severity } = useSelector((state) => state.ui.snackbar)
  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode])

  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch(showSnackbar({ message: 'Session expired. Please sign in again.', severity: 'warning' }))
      navigate(ROUTES.SESSION_EXPIRED)
    }

    const handleOffline = () => {
      dispatch(showSnackbar({ message: 'No Internet Connection. Please check your network.', severity: 'error' }))
    }

    const handleOnline = () => {
      dispatch(showSnackbar({ message: 'Internet connection restored.', severity: 'success' }))
    }

    window.addEventListener('auth:session-expired', handleSessionExpired)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpired)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [dispatch, navigate])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch(hideSnackbar())
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity || 'info'}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
