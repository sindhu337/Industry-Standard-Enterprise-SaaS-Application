import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'

const { ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR } = ROLES

export const sidebarConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'Dashboard',
    route: ROUTES.DASHBOARD,
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'divider-1',
    type: 'divider',
    title: 'WORKSPACE',
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'procurement',
    title: 'Procurement',
    icon: 'ShoppingCart',
    route: ROUTES.PROCUREMENT,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, EMPLOYEE],
    badge: 'pending',
  },
  {
    id: 'approvals',
    title: 'Approval Workbench',
    icon: 'CheckCircle',
    route: ROUTES.APPROVALS,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER],
    badge: 'approvals',
  },
  {
    id: 'vendors',
    title: 'Vendor Governance',
    icon: 'Business',
    route: ROUTES.VENDORS,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'divider-2',
    type: 'divider',
    title: 'GOVERNANCE',
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'risk',
    title: 'Risk Center',
    icon: 'Warning',
    route: ROUTES.RISK,
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'compliance',
    title: 'Compliance Center',
    icon: 'VerifiedUser',
    route: ROUTES.COMPLIANCE,
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'audit',
    title: 'Audit Center',
    icon: 'FindInPage',
    route: ROUTES.AUDIT,
    allowedRoles: [ADMIN, AUDITOR],
  },
  {
    id: 'divider-3',
    type: 'divider',
    title: 'ANALYTICS',
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'reports',
    title: 'Reporting Center',
    icon: 'Assessment',
    route: ROUTES.REPORTS,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'Notifications',
    route: ROUTES.NOTIFICATIONS,
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    badge: 'unread',
  },
  {
    id: 'divider-4',
    type: 'divider',
    title: 'ACCOUNT',
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    route: ROUTES.SETTINGS,
    allowedRoles: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
  },
]

export function getMenuForRole(role) {
  return sidebarConfig.filter((item) => item.allowedRoles.includes(role))
}
