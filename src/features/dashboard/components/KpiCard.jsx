import { Card, CardContent, Box, Typography, Avatar } from '@mui/material'
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
  totalProcurementRequests: { icon: ShoppingCartOutlined, color: 'primary.main', bgcolor: 'primary.light' },
  activeVendors: { icon: BusinessOutlined, color: 'info.main', bgcolor: 'info.light' },
  openRisks: { icon: ReportProblemOutlined, color: 'error.main', bgcolor: 'error.light' },
  complianceScore: { icon: VerifiedUserOutlined, color: 'success.main', bgcolor: 'success.light' },
  pendingApprovals: { icon: CheckCircleOutlined, color: 'warning.main', bgcolor: 'warning.light' },
  auditFindings: { icon: AssignmentOutlined, color: 'secondary.main', bgcolor: 'secondary.light' },
}

export default function KpiCard({ type, label, value, change, trend }) {
  const meta = ICON_MAP[type] || { icon: AssignmentOutlined, color: 'primary.main', bgcolor: 'primary.light' }
  const IconComponent = meta.icon

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
        borderRadius: 2.5,
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
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: 'text.primary', letterSpacing: '-1px' }}>
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: meta.bgcolor,
              color: meta.color,
              width: 44,
              height: 44,
              borderRadius: 2,
              '& .MuiSvgIcon-root': { fontSize: 24 },
            }}
          >
            <IconComponent />
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2.5 }}>
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
