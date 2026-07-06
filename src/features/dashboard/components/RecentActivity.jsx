import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Avatar, Chip } from '@mui/material'
import {
  ShoppingCartOutlined as ProcurementIcon,
  BusinessOutlined as VendorIcon,
  ReportProblemOutlined as RiskIcon,
  VerifiedUserOutlined as ComplianceIcon,
  AssignmentOutlined as AuditIcon,
} from '@mui/icons-material'
import { dashboardMockData } from '../data/dashboardMockData'

const ICON_MAP = {
  procurement: { icon: ProcurementIcon, color: 'primary.main', bgcolor: 'primary.light', label: 'Procurement' },
  vendor: { icon: VendorIcon, color: 'info.main', bgcolor: 'info.light', label: 'Vendor' },
  risk: { icon: RiskIcon, color: 'error.main', bgcolor: 'error.light', label: 'Risk' },
  compliance: { icon: ComplianceIcon, color: 'success.main', bgcolor: 'success.light', label: 'Compliance' },
  audit: { icon: AuditIcon, color: 'secondary.main', bgcolor: 'secondary.light', label: 'Audit' },
}

export default function RecentActivity() {
  const activities = dashboardMockData.recentActivity

  const getActivityStyle = (type) => {
    return ICON_MAP[type] || { icon: AuditIcon, color: 'primary.main', bgcolor: 'primary.light', label: 'System' }
  }

  return (
    <Card sx={{ borderRadius: 1.5, boxShadow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Recent Activity Timeline
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Audit trails and operational status logs across e-GRCP modules
        </Typography>
        <List disablePadding>
          {activities.map((act, index) => {
            const style = getActivityStyle(act.type)
            const Icon = style.icon
            return (
              <ListItem
                key={act.id}
                sx={{
                  px: 0,
                  py: 1.8,
                  alignItems: 'flex-start',
                  borderBottom: index < activities.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  gap: 1.5,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: style.bgcolor,
                    color: style.color,
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </Avatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={style.label}
                          size="small"
                          sx={{
                            fontSize: '0.65rem',
                            height: 18,
                            fontWeight: 'bold',
                            bgcolor: style.bgcolor,
                            color: style.color,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          {act.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.primary" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                        <strong>{act.user}</strong> {act.action}{' '}
                        <span style={{ color: 'var(--mui-palette-primary-main)', fontWeight: 600 }}>{act.target}</span>
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}
