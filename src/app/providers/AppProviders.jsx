import { useMemo } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CssBaseline, Snackbar, Alert } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import { store, persistor } from '@/app/store/store'
import { lightTheme, darkTheme } from '@/theme/theme'
import { hideSnackbar } from '@/app/store/slices/uiSlice'

function ThemeWrapper({ children }) {
  const dispatch = useDispatch()
  const themeMode = useSelector((state) => state.ui.themeMode)
  const { open, message, severity } = useSelector((state) => state.ui.snackbar)
  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch(hideSnackbar())
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
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
