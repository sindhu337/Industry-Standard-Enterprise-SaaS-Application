import { ROUTE_PERMISSIONS } from '@/constants/permissions'

function normalizeRoutePath(pathname) {
  const withoutSearch = pathname.split('?')[0]
  const trimmed = withoutSearch.endsWith('/') && withoutSearch !== '/' ? withoutSearch.slice(0, -1) : withoutSearch
  return trimmed || '/'
}

function matchesRoutePattern(pathname, pattern) {
  const normalizedPath = normalizeRoutePath(pathname)
  const normalizedPattern = normalizeRoutePath(pattern)

  if (normalizedPath === normalizedPattern) return true

  const pathSegments = normalizedPath.split('/').filter(Boolean)
  const patternSegments = normalizedPattern.split('/').filter(Boolean)

  if (pathSegments.length !== patternSegments.length) return false

  return patternSegments.every((segment, index) => segment.startsWith(':') || segment === pathSegments[index])
}

export function getRouteAccess(role, pathname) {
  if (!role) return false

  const allowedRoles = Object.entries(ROUTE_PERMISSIONS).find(([routePattern]) => matchesRoutePattern(pathname, routePattern))?.[1]
  if (!allowedRoles) return true

  return allowedRoles.includes(role)
}
