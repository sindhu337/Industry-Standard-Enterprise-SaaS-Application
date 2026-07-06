import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import ErrorBoundary from '@/components/feedback/ErrorBoundary'
import { Agentation } from 'agentation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Agentation />
    </ErrorBoundary>
  </StrictMode>
)
