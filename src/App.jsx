import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { store, persistor } from '@/redux/store'
import { lightTheme, darkTheme } from '@/theme/theme'
import '@/styles/globals.css'

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

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeWrapper>
            <div id="app-root">
              {/* AppRouter will be wired here in Phase 2 */}
              <h1 style={{ textAlign: 'center', marginTop: '4rem', color: '#1565C0' }}>
                e-GRCP Platform — Phase 1 Complete ✓
              </h1>
              <p style={{ textAlign: 'center', marginTop: '1rem', color: '#546E7A' }}>
                Infrastructure, Redux Store, Theme, and Mock Data are ready.
              </p>
            </div>
          </ThemeWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
