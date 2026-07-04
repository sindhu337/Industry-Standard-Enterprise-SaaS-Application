import { ROLES } from './roles'

const { ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR } = ROLES

export const PERMISSIONS = {
  procurement: {
    view: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, AUDITOR],
    create: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER],
    edit: [ADMIN, PROCUREMENT_MANAGER],
    delete: [ADMIN],
    approve: [ADMIN, PROCUREMENT_MANAGER],
    export: [ADMIN, PROCUREMENT_MANAGER, AUDITOR],
  },
  vendors: {
    view: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    create: [ADMIN, PROCUREMENT_MANAGER],
    edit: [ADMIN, PROCUREMENT_MANAGER],
    delete: [ADMIN],
    export: [ADMIN, PROCUREMENT_MANAGER, AUDITOR],
  },
  risk: {
    view: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
    create: [ADMIN, COMPLIANCE_OFFICER],
    edit: [ADMIN, COMPLIANCE_OFFICER],
    delete: [ADMIN],
    export: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
  },
  compliance: {
    view: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
    create: [ADMIN, COMPLIANCE_OFFICER],
    edit: [ADMIN, COMPLIANCE_OFFICER],
    delete: [ADMIN],
    export: [ADMIN, COMPLIANCE_OFFICER, AUDITOR],
  },
  audit: {
    view: [ADMIN, AUDITOR],
    create: [ADMIN, AUDITOR],
    edit: [ADMIN],
    delete: [ADMIN],
    export: [ADMIN, AUDITOR],
  },
  reports: {
    view: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    export: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    save: [ADMIN, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    delete: [ADMIN],
  },
  settings: {
    viewProfile: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    editProfile: [ADMIN, EMPLOYEE, PROCUREMENT_MANAGER, COMPLIANCE_OFFICER, AUDITOR],
    manageUsers: [ADMIN],
    manageRoles: [ADMIN],
  },
}

export function hasPermission(userRole, module, action) {
  return PERMISSIONS[module]?.[action]?.includes(userRole) ?? false
}
