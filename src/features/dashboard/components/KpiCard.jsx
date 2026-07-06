import { Card, CardContent, Box, Typography, Avatar, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
  ShoppingCartOutlined,
  BusinessOutlined,
  ReportProblemOutlined,
  VerifiedUserOutlined,
  CheckCircleOutlined,
  AssignmentOutlined,
} from '@mui/icons-material'

const ICON_MAP = {
  totalProcurementRequests: { icon: ShoppingCartOutlined, paletteKey: 'primary' },
  activeVendors: { icon: BusinessOutlined, paletteKey: 'info' },
  openRisks: { icon: ReportProblemOutlined, paletteKey: 'error' },
  complianceScore: { icon: VerifiedUserOutlined, paletteKey: 'success' },
  pendingApprovals: { icon: CheckCircleOutlined, paletteKey: 'warning' },
  auditFindings: { icon: AssignmentOutlined, paletteKey: 'secondary' },
}

export default function KpiCard({ type, label, value, change, trend }) {
  const theme = useTheme()
  const meta = ICON_MAP[type] || { icon: AssignmentOutlined, paletteKey: 'primary' }
  const IconComponent = meta.icon
  const paletteColor = theme.palette[meta.paletteKey]?.main || theme.palette.primary.main

  const getTrendColor = () => {
    if (trend === 'up') return 'success.main'
    if (trend === 'down') return 'error.main'
    return 'text.secondary'
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
    if (trend === 'down') return <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
    return <ArrowRightAltIcon fontSize="small" sx={{ mr: 0.5 }} />
  }

  return (
    <Card
      sx={{
        borderRadius: 1.5,
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              sx={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}
              noWrap
            >
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: 'text.primary', letterSpacing: '-1px' }}>
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(paletteColor, 0.12),
              color: paletteColor,
              width: 44,
              height: 44,
              borderRadius: 2,
              flexShrink: 0,
              '& .MuiSvgIcon-root': { fontSize: 24 },
            }}
          >
            <IconComponent />
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', color: getTrendColor(), bgcolor: 'action.hover', px: 1, py: 0.2, borderRadius: 1 }}>
            {getTrendIcon()}
            <Typography variant="caption" fontWeight="bold">
              {change}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontWeight: 500 }}>
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
