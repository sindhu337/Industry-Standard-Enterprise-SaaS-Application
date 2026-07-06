import { Box, Card, CardContent, Grid, Typography, Paper, Divider, Stack, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  AssignmentTurnedIn as TotalIcon,
  PendingActions as PendingIcon,
  AttachMoney as SpendIcon,
  NotificationsActive as AlertIcon,
  CheckCircle as ApprovedIcon,
  Error as RejectedIcon
} from '@mui/icons-material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'


const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val)
}

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

export default function EmployeeDashboard() {
  const { user } = useSelector((state) => state.auth)
  const theme = useTheme()

  
  const myRequests = PROCUREMENT_MOCK_DATA.filter(
    (item) => item.requestedById === user?.id || item.requestedBy === user?.name
  )

  
  const totalSpend = myRequests.reduce((acc, item) => acc + item.amount, 0)
  const pendingRequests = myRequests.filter((item) => item.status === 'Pending').length
  const approvedRequests = myRequests.filter((item) => item.status === 'Approved').length
  const rejectedRequests = myRequests.filter((item) => item.status === 'Rejected').length

  
  const categorySpendMap = myRequests.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})

  const categoryColors = ['#1976d2', '#9c27b0', '#ed6c02', '#2e7d32', '#d32f2f']
  const categoryData = Object.keys(categorySpendMap).map((cat, index) => ({
    name: cat,
    value: categorySpendMap[cat],
    color: categoryColors[index % categoryColors.length]
  }))

  
  const monthlyData = [
    { name: 'Jan', Approved: 0, Pending: 0 },
    { name: 'Feb', Approved: 1, Pending: 0 },
    { name: 'Mar', Approved: 2, Pending: 1 },
    { name: 'Apr', Approved: 1, Pending: 0 },
    { name: 'May', Approved: 3, Pending: 2 },
    { name: 'Jun', Approved: approvedRequests, Pending: pendingRequests },
  ]

  
  const recentActivity = myRequests.slice(0, 4).map((item) => {
    let statusColor = 'info.main'
    let Icon = AlertIcon
    if (item.status === 'Approved') {
      statusColor = 'success.main'
      Icon = ApprovedIcon
    } else if (item.status === 'Rejected') {
      statusColor = 'error.main'
      Icon = RejectedIcon
    } else if (item.status === 'Pending') {
      statusColor = 'warning.main'
      Icon = PendingIcon
    }

    return {
      id: item.id,
      title: item.title,
      subtitle: `${formatCurrency(item.amount)} • Category: ${item.category}`,
      time: `Status: ${item.status}`,
      icon: Icon,
      color: statusColor
    }
  })

  return (
    <PageContainer>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            Welcome Back, {user?.name?.split(' ')[0] || 'Employee'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Submit and track your procurement requests, view budgets, and monitor updates.
          </Typography>
        </Box>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="My Requests" value={myRequests.length} icon={TotalIcon} color="primary" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Total Requested Spend" value={formatCurrency(totalSpend)} icon={SpendIcon} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Pending Approvals" value={pendingRequests} icon={PendingIcon} color="warning" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Rejected Requests" value={rejectedRequests} icon={RejectedIcon} color="error" />
        </Grid>
      </Grid>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {}
        <Grid size={{xs: 12, lg: 8}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              My Procurement Requests History (6 Months)
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Approved" fill={theme.palette.success.main} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pending" fill={theme.palette.warning.main} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {}
        <Grid size={{xs: 12, lg: 4}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Requested Spend by Category
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              {categoryData.length > 0 ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="body2" color="text.secondary">No request data available.</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            My Recent Requests
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => {
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
                      <Typography variant="caption" color={actualColor} fontWeight={700}>
                        {activity.time}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider component="li" />}
                </Box>
              )
            })
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">You haven't submitted any procurement requests yet.</Typography>
            </Box>
          )}
        </List>
      </Paper>
    </PageContainer>
  )
}
