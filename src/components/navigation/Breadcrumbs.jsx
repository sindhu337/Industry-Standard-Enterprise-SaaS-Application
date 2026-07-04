import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, Box } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { ROUTE_TO_MODULE, MODULE_LABELS } from '@/constants/menus'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  
  if (pathname === '/dashboard') {
    return (
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          Dashboard
        </Typography>
      </MuiBreadcrumbs>
    )
  }

  const segments = pathname.split('/').filter(Boolean)

  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link
        component={RouterLink}
        to="/dashboard"
        underline="hover"
        color="text.secondary"
        variant="body2"
      >
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        
        let label = segment
        if (ROUTE_TO_MODULE[path]) {
          label = MODULE_LABELS[ROUTE_TO_MODULE[path]]
        } else {
          label = segment.charAt(0).toUpperCase() + segment.slice(1)
        }

        const isLast = index === segments.length - 1
        
        return isLast ? (
          <Typography key={path} variant="body2" color="text.primary" fontWeight={600}>
            {label}
          </Typography>
        ) : (
          <Link
            key={path}
            component={RouterLink}
            to={path}
            underline="hover"
            color="text.secondary"
            variant="body2"
          >
            {label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
