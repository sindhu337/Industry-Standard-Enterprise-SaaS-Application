import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

import { ROUTES } from '@/constants/routes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleRoute from './RoleRoute'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'

const LoginPage = lazy(() => import('@/features/auth/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/SignupPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/ResetPasswordPage'))
const SessionExpiredPage = lazy(() => import('@/features/auth/SessionExpiredPage'))

const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'))
const ProcurementPage = lazy(() => import('@/features/procurement/ProcurementPage'))
const ProcurementCreatePage = lazy(() => import('@/features/procurement/ProcurementCreatePage'))
const ProcurementDetailPage = lazy(() => import('@/features/procurement/ProcurementDetailPage'))
const ApprovalsPage = lazy(() => import('@/features/procurement/ApprovalsPage'))
const VendorPage = lazy(() => import('@/features/vendors/VendorPage'))
const VendorDetailPage = lazy(() => import('@/features/vendors/VendorDetailPage'))
const RiskPage = lazy(() => import('@/features/risk/RiskPage'))
const CompliancePage = lazy(() => import('@/features/compliance/CompliancePage'))
const AuditPage = lazy(() => import('@/features/audit/AuditPage'))
const ReportPage = lazy(() => import('@/features/reports/ReportPage'))
const NotificationPage = lazy(() => import('@/features/notifications/NotificationPage'))
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'))

const NotFoundPage = lazy(() => import('@/features/auth/NotFoundPage'))
const ForbiddenPage = lazy(() => import('@/features/auth/ForbiddenPage'))
const ServerErrorPage = lazy(() => import('@/features/auth/ServerErrorPage'))

import { ROLES } from '@/constants/roles'

const { ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR } = ROLES
const ALL_ROLES = [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR]
const GOV_ROLES = [ADMIN, COMPLIANCE_OFFICER, AUDITOR]
const PROC_ROLES = [ADMIN, PROCUREMENT_MANAGER, EMPLOYEE]
const REPORT_ROLES = [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR]

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
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />

        <Route path={ROUTES.LOGIN} element={<PublicPage><LoginPage /></PublicPage>} />
        <Route path={ROUTES.SIGNUP} element={<PublicPage><SignupPage /></PublicPage>} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicPage><ForgotPasswordPage /></PublicPage>} />
        <Route path={ROUTES.RESET_PASSWORD} element={<PublicPage><ResetPasswordPage /></PublicPage>} />
        <Route path={ROUTES.SESSION_EXPIRED} element={<SessionExpiredPage />} />

        <Route path={ROUTES.DASHBOARD} element={<PrivatePage allowedRoles={ALL_ROLES}><DashboardPage /></PrivatePage>} />
        <Route path={ROUTES.PROCUREMENT} element={<PrivatePage allowedRoles={PROC_ROLES}><ProcurementPage /></PrivatePage>} />
        <Route path={ROUTES.PROCUREMENT_CREATE} element={<PrivatePage allowedRoles={PROC_ROLES}><ProcurementCreatePage /></PrivatePage>} />
        <Route path={ROUTES.PROCUREMENT_DETAIL} element={<PrivatePage allowedRoles={[...PROC_ROLES, AUDITOR]}><ProcurementDetailPage /></PrivatePage>} />
        <Route path={ROUTES.APPROVALS} element={<PrivatePage allowedRoles={[ADMIN, PROCUREMENT_MANAGER]}><ApprovalsPage /></PrivatePage>} />
        <Route path={ROUTES.VENDORS} element={<PrivatePage allowedRoles={REPORT_ROLES}><VendorPage /></PrivatePage>} />
        <Route path={ROUTES.VENDOR_DETAIL} element={<PrivatePage allowedRoles={REPORT_ROLES}><VendorDetailPage /></PrivatePage>} />
        <Route path={ROUTES.RISK} element={<PrivatePage allowedRoles={GOV_ROLES}><RiskPage /></PrivatePage>} />
        <Route path={ROUTES.COMPLIANCE} element={<PrivatePage allowedRoles={GOV_ROLES}><CompliancePage /></PrivatePage>} />
        <Route path={ROUTES.AUDIT} element={<PrivatePage allowedRoles={[ADMIN, AUDITOR]}><AuditPage /></PrivatePage>} />
        <Route path={ROUTES.REPORTS} element={<PrivatePage allowedRoles={REPORT_ROLES}><ReportPage /></PrivatePage>} />
        <Route path={ROUTES.NOTIFICATIONS} element={<PrivatePage allowedRoles={ALL_ROLES}><NotificationPage /></PrivatePage>} />
        <Route path={ROUTES.SETTINGS} element={<PrivatePage allowedRoles={ALL_ROLES}><SettingsPage /></PrivatePage>} />

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  )
}
