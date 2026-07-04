import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />
  }

  return children
}
