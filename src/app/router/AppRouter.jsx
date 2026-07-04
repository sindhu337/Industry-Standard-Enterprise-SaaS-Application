import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

import { ROUTES } from '@/constants/routes'
import { routeConfig, publicRoutes } from './routeConfig'

import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleRoute from './RoleRoute'

import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'

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

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        {publicRoutes.map(({ path, lazy: lazyImport }) => {
          const Page = lazy(lazyImport)
          return (
            <Route
              key={path}
              path={path}
              element={
                <PublicRoute>
                  <AuthLayout>
                    <Page />
                  </AuthLayout>
                </PublicRoute>
              }
            />
          )
        })}

        {routeConfig.map(({ path, lazy: lazyImport, allowedRoles }) => {
          const Page = lazy(lazyImport)
          return (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={allowedRoles}>
                    <AppLayout>
                      <Page />
                    </AppLayout>
                  </RoleRoute>
                </ProtectedRoute>
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
