import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

import { ROUTES } from '@/constants/routes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleRoute from './RoleRoute'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { routeConfig, publicRoutes } from './routeConfig'

const LandingPage = lazy(() => import('@/features/landing/LandingPage'))
const LoginPage = lazy(() => import('@/features/auth/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/SignupPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/ResetPasswordPage'))
const SessionExpiredPage = lazy(() => import('@/features/auth/SessionExpiredPage'))

const NotFoundPage = lazy(() => import('@/features/auth/NotFoundPage'))
const ForbiddenPage = lazy(() => import('@/features/auth/ForbiddenPage'))
const ServerErrorPage = lazy(() => import('@/features/auth/ServerErrorPage'))

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress size={40} />
    </Box>
  )
}

function PublicPage({ children }) {
  return (
    <PublicRoute>
      <AuthLayout>{children}</AuthLayout>
    </PublicRoute>
  )
}

function PrivatePage({ children, allowedRoles }) {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={allowedRoles}>
        <AppLayout>{children}</AppLayout>
      </RoleRoute>
    </ProtectedRoute>
  )
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />

        {publicRoutes.map(({ path, lazy: loader }) => {
          const LazyPage = lazy(loader)
          return <Route key={path} path={path} element={<PublicPage><LazyPage /></PublicPage>} />
        })}

        {routeConfig.map(({ path, allowedRoles, lazy: loader }) => {
          const LazyPage = lazy(loader)
          return (
            <Route
              key={path}
              path={path}
              element={
                <PrivatePage allowedRoles={allowedRoles}>
                  <LazyPage />
                </PrivatePage>
              }
            />
          )
        })}

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  )
}
