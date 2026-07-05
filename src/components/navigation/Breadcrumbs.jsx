import { Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { routeConfig } from '@/app/router/routeConfig';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  if (pathname === '/dashboard') {
    return (
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          Dashboard
        </Typography>
      </MuiBreadcrumbs>);

  }

  const segments = pathname.split('/').filter(Boolean);

  const getRouteLabel = (path, segment) => {
    const match = routeConfig.find((r) => r.path === path);
    if (match) return match.label;

    for (const route of routeConfig) {
      const pattern = route.path.
      replace(/:[a-zA-Z0-9_]+/g, '[^/]+').
      replace(/\//g, '\\/');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(path)) {
        if (route.path.includes('/:')) {
          return segment;
        }
        return route.label;
      }
    }

    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link
        component={RouterLink}
        to="/dashboard"
        underline="hover"
        color="text.secondary"
        variant="body2">
        
        Dashboard
      </Link>
      {segments.map((segment, index) => {
        if (segment === 'dashboard') return null;

        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const label = getRouteLabel(path, segment);
        const isLast = index === segments.length - 1;

        return isLast ?
        <Typography key={path} variant="body2" color="text.primary" fontWeight={600}>
            {label}
          </Typography> :

        <Link
          key={path}
          component={RouterLink}
          to={path}
          underline="hover"
          color="text.secondary"
          variant="body2">
          
            {label}
          </Link>;

      })}
    </MuiBreadcrumbs>);

}