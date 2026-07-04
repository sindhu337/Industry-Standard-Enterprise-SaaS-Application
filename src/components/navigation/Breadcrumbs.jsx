import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { ROUTE_TO_MODULE, MODULE_LABELS } from '@/constants/menus'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link component={RouterLink} to="/dashboard" underline="hover" color="text.secondary" variant="body2">
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const label = MODULE_LABELS[ROUTE_TO_MODULE[path]] || segment.charAt(0).toUpperCase() + segment.slice(1)
        const isLast = index === segments.length - 1
        return isLast ? (
          <Typography key={path} variant="body2" color="text.primary" fontWeight={600}>
            {label}
          </Typography>
        ) : (
          <Link key={path} component={RouterLink} to={path} underline="hover" color="text.secondary" variant="body2">
            {label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
