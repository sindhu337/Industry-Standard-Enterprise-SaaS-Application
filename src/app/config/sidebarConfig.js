import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import { hasPermission } from '@/constants/permissions'

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
    id: 'employee-create',
    title: 'Create Request',
    icon: 'ShoppingCart',
    route: ROUTES.PROCUREMENT_CREATE,
    allowedRoles: [EMPLOYEE],
    requiredPermission: 'procurement.create',
  },
  {
    id: 'employee-requests',
    title: 'My Requests',
    icon: 'Assignment',
    route: ROUTES.PROCUREMENT,
    allowedRoles: [EMPLOYEE],
    requiredPermission: 'procurement.view',
  },
  {
    id: 'approvals',
    title: 'Approval Workbench',
    icon: 'CheckCircle',
    route: ROUTES.APPROVALS,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER],
    requiredPermission: 'procurement.approve',
  },
  {
    id: 'procurement',
    title: 'Procurement',
    icon: 'ShoppingCart',
    route: ROUTES.PROCUREMENT,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER],
    requiredPermission: 'procurement.view',
  },
  {
    id: 'vendors',
    title: 'Vendor Management',
    icon: 'Business',
    route: ROUTES.VENDORS,
    allowedRoles: [ADMIN],
    requiredPermission: 'vendors.view',
  },
  {
    id: 'compliance',
    title: 'Compliance Center',
    icon: 'VerifiedUser',
    route: ROUTES.COMPLIANCE,
    allowedRoles: [ADMIN, COMPLIANCE_OFFICER],
    requiredPermission: 'compliance.view',
  },
  {
    id: 'audit',
    title: 'Audit Center',
    icon: 'FindInPage',
    route: ROUTES.AUDIT,
    allowedRoles: [ADMIN, AUDITOR],
    requiredPermission: 'audit.view',
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'Assessment',
    route: ROUTES.REPORTS,
    allowedRoles: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    requiredPermission: 'reports.view',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    route: ROUTES.SETTINGS,
    allowedRoles: [ADMIN],
  },
]

export function getMenuForRole(role) {
  return sidebarConfig.filter((item) => {
    if (!item.allowedRoles.includes(role)) return false
    if (!item.requiredPermission) return true
    const [module, action] = item.requiredPermission.split('.')
    return hasPermission(role, module, action)
  })
}
