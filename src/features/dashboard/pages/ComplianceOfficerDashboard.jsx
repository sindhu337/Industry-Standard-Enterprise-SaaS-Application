import { Box, Card, CardContent, Grid, Typography, Paper, Divider, Stack, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  Gavel as PolicyIcon,
  VerifiedUser as SafeIcon,
  Warning as WarningIcon,
  Rule as ReviewIcon,
  CheckCircle as ApprovedIcon,
  Error as RejectedIcon,
  Assignment as LogIcon,
} from '@mui/icons-material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

const StatCard = ({ title, value, icon: Icon, color }) => {
  const theme = useTheme()
  const mainColor = theme.palette[color]?.main || color
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1.5,
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: mainColor,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(mainColor, 0.15)}`,
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600} noWrap gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800} noWrap>
              {value}
            </Typography>
          </Box>
          <Box sx={{ 
            width: 48, height: 48, borderRadius: 2, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: alpha(mainColor, 0.1), color: mainColor
          }}>
            <Icon />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function ComplianceOfficerDashboard() {
  const theme = useTheme()

  
  const totalItems = PROCUREMENT_MOCK_DATA.length
  const compliantItems = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Compliant').length
  const underReviewItems = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Under Review').length
  const nonCompliantItems = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Non-Compliant').length

  const complianceScore = totalItems > 0 
    ? ((compliantItems / (compliantItems + nonCompliantItems)) * 100).toFixed(1) 
    : '100'

  
  const monthlyReviewData = [
    { name: 'Jan', Reviews: 14 },
    { name: 'Feb', Reviews: 22 },
    { name: 'Mar', Reviews: 35 },
    { name: 'Apr', Reviews: 20 },
    { name: 'May', Reviews: 42 },
    { name: 'Jun', Reviews: totalItems },
  ]

  
  const complianceRatioData = [
    { name: 'Compliant', value: compliantItems, color: '#2e7d32' },
    { name: 'Under Review', value: underReviewItems, color: '#ed6c02' },
    { name: 'Violations', value: nonCompliantItems, color: '#d32f2f' },
  ]

  
  const complianceAlerts = PROCUREMENT_MOCK_DATA.slice(0, 4).map((item) => {
    let statusColor = 'info.main'
    let Icon = LogIcon
    if (item.complianceStatus === 'Compliant') {
      statusColor = 'success.main'
      Icon = SafeIcon
    } else if (item.complianceStatus === 'Under Review') {
      statusColor = 'warning.main'
      Icon = ReviewIcon
    } else if (item.complianceStatus === 'Non-Compliant') {
      statusColor = 'error.main'
      Icon = WarningIcon
    }

    return {
      id: item.id,
      title: `Compliance Review: ${item.title}`,
      subtitle: `Vendor: ${item.vendor} • Requested by ${item.requestedBy}`,
      time: `Status: ${item.complianceStatus || 'Not Reviewed'}`,
      icon: Icon,
      color: statusColor
    }
  })

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          Compliance Workbench
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Evaluate regulatory policies, audit procurement compliance, examine supplier qualifications, and track policy exceptions.
        </Typography>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Compliance Index" value={`${complianceScore}%`} icon={SafeIcon} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Pending Review" value={underReviewItems} icon={ReviewIcon} color="warning" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Active Violations" value={nonCompliantItems} icon={WarningIcon} color="error" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Monitored Policies" value="18 Active" icon={PolicyIcon} color="primary" />
        </Grid>
      </Grid>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {}
        <Grid size={{xs: 12, lg: 8}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Policy & Request Reviews Completed (6 Months)
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyReviewData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Bar dataKey="Reviews" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {}
        <Grid size={{xs: 12, lg: 4}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Procurement Compliance Distribution
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={complianceRatioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {complianceRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Compliance Evaluation Alerts
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {complianceAlerts.map((activity, index) => {
            const Icon = activity.icon
            const [paletteKey, shade] = activity.color.split('.')
            const actualColor = theme.palette[paletteKey]?.[shade] || theme.palette.primary.main
            
            return (
              <Box key={activity.id}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: alpha(actualColor, 0.1), color: actualColor }}>
                      <Icon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<Typography variant="body2" fontWeight={600}>{activity.title}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{activity.subtitle}</Typography>}
                  />
                  <Box sx={{ flexShrink: 0, ml: 2 }}>
                    <Box
                      sx={{
                        px: 1.5, py: 0.5, borderRadius: 1,
                        bgcolor: alpha(actualColor, 0.1), color: actualColor,
                        fontSize: '11px', fontWeight: 700
                      }}
                    >
                      {activity.time.replace('Status: ', '')}
                    </Box>
                  </Box>
                </ListItem>
                {index < complianceAlerts.length - 1 && <Divider component="li" />}
              </Box>
            )
          })}
        </List>
      </Paper>
    </PageContainer>
  )
}
