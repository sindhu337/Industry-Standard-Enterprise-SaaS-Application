import AppProviders from '@/app/providers/AppProviders'
import AppRouter from '@/app/router/AppRouter'
import '@/styles/globals.css'

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}
