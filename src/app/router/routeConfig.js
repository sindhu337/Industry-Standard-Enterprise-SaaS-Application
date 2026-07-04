import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'

const { ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR } = ROLES

export const routeConfig = [
  {
    path: ROUTES.DASHBOARD,
    key: 'dashboard',
    label: 'Dashboard',
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/dashboard/DashboardPage'),
  },
  {
    path: ROUTES.PROCUREMENT,
    key: 'procurement',
    label: 'Procurement',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, EMPLOYEE],
    lazy: () => import('@/features/procurement/ProcurementPage'),
  },
  {
    path: ROUTES.PROCUREMENT_CREATE,
    key: 'procurement-create',
    label: 'Create Procurement',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, EMPLOYEE],
    lazy: () => import('@/features/procurement/ProcurementCreatePage'),
  },
  {
    path: ROUTES.PROCUREMENT_DETAIL,
    key: 'procurement-detail',
    label: 'Procurement Detail',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, EMPLOYEE, AUDITOR],
    lazy: () => import('@/features/procurement/ProcurementDetailPage'),
  },
  {
    path: ROUTES.VENDORS,
    key: 'vendors',
    label: 'Vendors',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/vendors/VendorPage'),
  },
  {
    path: ROUTES.VENDOR_DETAIL,
    key: 'vendor-detail',
    label: 'Vendor Detail',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/vendors/VendorDetailPage'),
  },
  {
    path: ROUTES.RISK,
    key: 'risk',
    label: 'Risk Center',
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/risk/RiskPage'),
  },
  {
    path: ROUTES.COMPLIANCE,
    key: 'compliance',
    label: 'Compliance Center',
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/compliance/CompliancePage'),
  },
  {
    path: ROUTES.AUDIT,
    key: 'audit',
    label: 'Audit Center',
    allowedRoles: [ADMIN, AUDITOR],
    lazy: () => import('@/features/audit/AuditPage'),
  },
  {
    path: ROUTES.REPORTS,
    key: 'reports',
    label: 'Reporting Center',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/reports/ReportPage'),
  },
  {
    path: ROUTES.NOTIFICATIONS,
    key: 'notifications',
    label: 'Notifications',
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/notifications/NotificationPage'),
  },
  {
    path: ROUTES.APPROVALS,
    key: 'approvals',
    label: 'Approvals',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER],
    lazy: () => import('@/features/procurement/ApprovalsPage'),
  },
  {
    path: ROUTES.SETTINGS,
    key: 'settings',
    label: 'Settings',
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    lazy: () => import('@/features/settings/SettingsPage'),
  },
]

export const publicRoutes = [
  { path: ROUTES.LOGIN, lazy: () => import('@/features/auth/LoginPage') },
  { path: ROUTES.SIGNUP, lazy: () => import('@/features/auth/SignupPage') },
  { path: ROUTES.FORGOT_PASSWORD, lazy: () => import('@/features/auth/ForgotPasswordPage') },
  { path: ROUTES.RESET_PASSWORD, lazy: () => import('@/features/auth/ResetPasswordPage') },
  { path: ROUTES.SESSION_EXPIRED, lazy: () => import('@/features/auth/SessionExpiredPage') },
]
