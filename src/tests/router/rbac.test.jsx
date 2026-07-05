import { getMenuForRole } from '@/app/config/sidebarConfig'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import { getRouteAccess } from '@/app/router/roleAccess'

describe('RBAC architecture', () => {
  it('filters sidebar items for an employee role', () => {
    const menu = getMenuForRole(ROLES.EMPLOYEE)

    expect(menu.some((item) => item.route === ROUTES.APPROVALS)).toBe(false)
    expect(menu.some((item) => item.route === ROUTES.PROCUREMENT)).toBe(true)
  })

  it('limits route access based on role groups', () => {
    expect(getRouteAccess(ROLES.EMPLOYEE, ROUTES.DASHBOARD)).toBe(true)
    expect(getRouteAccess(ROLES.EMPLOYEE, ROUTES.APPROVALS)).toBe(false)
    expect(getRouteAccess(ROLES.PROCUREMENT_MANAGER, ROUTES.APPROVALS)).toBe(true)
    expect(getRouteAccess(ROLES.ADMIN, ROUTES.APPROVALS)).toBe(true)
    expect(getRouteAccess(ROLES.COMPLIANCE_OFFICER, ROUTES.APPROVALS)).toBe(false)
    expect(getRouteAccess(ROLES.AUDITOR, ROUTES.AUDIT)).toBe(true)
  })

  it('matches dynamic detail and edit routes against role permissions', () => {
    expect(getRouteAccess(ROLES.EMPLOYEE, '/procurement/123')).toBe(true)
    expect(getRouteAccess(ROLES.EMPLOYEE, '/procurement/123/edit')).toBe(false)
    expect(getRouteAccess(ROLES.PROCUREMENT_MANAGER, '/procurement/123/edit')).toBe(true)
  })
})
