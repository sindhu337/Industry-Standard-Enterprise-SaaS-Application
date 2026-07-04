import { useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import { store, persistor } from '@/app/store/store'
import { lightTheme, darkTheme } from '@/theme/theme'

function ThemeWrapper({ children }) {
  const themeMode = useSelector((state) => state.ui.themeMode)
  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
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
