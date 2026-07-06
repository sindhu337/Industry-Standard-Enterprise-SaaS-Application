import { Box, Card, CardContent, Grid, Typography, Paper, Divider, Stack, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  FactCheck as AuditIcon,
  Help as ObservationIcon,
  Verified as PassIcon,
  RateReview as ReviewIcon,
  CheckCircle as ApprovedIcon,
  Error as RejectedIcon,
  LibraryBooks as ReportIcon,
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

export default function AuditorDashboard() {
  const theme = useTheme()

  // Dynamic calculations from mock data
  const totalItems = PROCUREMENT_MOCK_DATA.length
  const auditedItems = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Audited').length
  const pendingAudits = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Pending Audit').length
  const observationItems = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Observation Raised').length

  const resolutionRate = auditedItems > 0 
    ? ((auditedItems / (auditedItems + observationItems)) * 100).toFixed(1) 
    : '100'

  // Chart Data: Findings by Department
  const deptFindingsMap = PROCUREMENT_MOCK_DATA.reduce((acc, item) => {
    if (item.auditStatus === 'Observation Raised') {
      acc[item.department] = (acc[item.department] || 0) + 1
    }
    return acc
  }, {})

  const deptFindingsData = Object.keys(deptFindingsMap).map((dept) => ({
    department: dept,
    Findings: deptFindingsMap[dept]
  }))

  // Fallback if no observations
  const chartDeptData = deptFindingsData.length > 0 
    ? deptFindingsData 
    : [
        { department: 'IT', Findings: 3 },
        { department: 'HR', Findings: 1 },
        { department: 'Finance', Findings: 2 },
        { department: 'Operations', Findings: 4 }
      ]

  // Chart Data: Audit status distribution
  const auditStatusDistribution = [
    { name: 'Audited & Closed', value: auditedItems || 5, color: '#2e7d32' },
    { name: 'Pending Audit', value: pendingAudits || 10, color: '#ed6c02' },
    { name: 'Observations Raised', value: observationItems || 3, color: '#d32f2f' },
  ]

  // Recent Activity Feed
  const recentAudits = PROCUREMENT_MOCK_DATA.slice(0, 4).map((item) => {
    let statusColor = 'info.main'
    let Icon = ReviewIcon
    if (item.auditStatus === 'Audited') {
      statusColor = 'success.main'
      Icon = PassIcon
    } else if (item.auditStatus === 'Pending Audit') {
      statusColor = 'warning.main'
      Icon = ReviewIcon
    } else if (item.auditStatus === 'Observation Raised') {
      statusColor = 'error.main'
      Icon = ObservationIcon
    }

    return {
      id: item.id,
      title: `Audit check: ${item.title}`,
      subtitle: `${item.department} • Requested by ${item.requestedBy}`,
      time: `Audit Status: ${item.auditStatus || 'Pending Audit'}`,
      icon: Icon,
      color: statusColor
    }
  })

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          Audit Desk
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Investigate transaction histories, record exceptions, review control effectiveness, and export compliance audit logs.
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Audited Requests" value={auditedItems} icon={PassIcon} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Observations Raised" value={observationItems} icon={ObservationIcon} color="error" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Pending Review" value={pendingAudits} icon={ReviewIcon} color="warning" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Resolution Efficiency" value={`${resolutionRate}%`} icon={AuditIcon} color="primary" />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Bar Chart: Department Findings */}
        <Grid size={{xs: 12, lg: 8}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Audit Observations Raised by Department
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart data={chartDeptData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Bar dataKey="Findings" fill={theme.palette.error.main} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Pie Chart: Audit distribution */}
        <Grid size={{xs: 12, lg: 4}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Audit Pipeline Status
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={auditStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {auditStatusDistribution.map((entry, index) => (
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

      {/* Activity list */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Recent Audit Pipeline Actions
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentAudits.map((activity, index) => {
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
                      {activity.time.replace('Audit Status: ', '')}
                    </Box>
                  </Box>
                </ListItem>
                {index < recentAudits.length - 1 && <Divider component="li" />}
              </Box>
            )
          })}
        </List>
      </Paper>
    </PageContainer>
  )
}
