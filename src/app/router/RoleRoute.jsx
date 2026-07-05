import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getRouteAccess } from './roleAccess'

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  const hasRoleAccess = Boolean(user && allowedRoles.includes(user.role))
  const hasRouteAccess = getRouteAccess(user?.role, location.pathname)

  if (!user || !hasRoleAccess || !hasRouteAccess) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />
  }

  return children
}
