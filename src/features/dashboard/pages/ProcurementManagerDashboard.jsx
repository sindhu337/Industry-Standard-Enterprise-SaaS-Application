import { Box, Card, CardContent, Grid, Typography, Paper, Divider, Stack, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  ReceiptLong as TotalIcon,
  PendingActions as PendingIcon,
  AttachMoney as SpendIcon,
  Business as VendorIcon,
  CheckCircle as ApprovedIcon,
  Error as AlertIcon,
  AccessTime as CycleIcon,
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

export default function ProcurementManagerDashboard() {
  const { user } = useSelector((state) => state.auth)
  const theme = useTheme()

  
  const totalRequests = PROCUREMENT_MOCK_DATA.length
  const pendingRequests = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Pending').length
  const approvedRequests = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Approved').length
  
  const totalApprovedSpend = PROCUREMENT_MOCK_DATA
    .filter((item) => item.status === 'Approved')
    .reduce((acc, item) => acc + item.amount, 0)

  
  const spendTrendData = [
    { name: 'Jan', Spend: 12.4 },
    { name: 'Feb', Spend: 18.2 },
    { name: 'Mar', Spend: 25.0 },
    { name: 'Apr', Spend: 15.6 },
    { name: 'May', Spend: 32.1 },
    { name: 'Jun', Spend: totalApprovedSpend / 10000000 }, 
  ]

  
  const vendorRiskData = [
    { name: 'Low Risk', value: 8, color: '#2e7d32' },
    { name: 'Medium Risk', value: 4, color: '#ed6c02' },
    { name: 'High Risk', value: 2, color: '#d32f2f' },
  ]

  
  const recentRequests = PROCUREMENT_MOCK_DATA.slice(0, 4).map((item) => {
    let statusColor = 'info.main'
    let Icon = TotalIcon
    if (item.status === 'Approved') {
      statusColor = 'success.main'
      Icon = ApprovedIcon
    } else if (item.status === 'Pending') {
      statusColor = 'warning.main'
      Icon = PendingIcon
    }

    return {
      id: item.id,
      title: item.title,
      subtitle: `Requested by ${item.requestedBy} • ${item.department}`,
      amount: formatCurrency(item.amount),
      status: item.status,
      icon: Icon,
      color: statusColor
    }
  })

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          Procurement Workbench
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage approval queues, monitor budgets, coordinate supplier risks, and track organizational spending.
        </Typography>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Total Approved Spend" value={formatCurrency(totalApprovedSpend)} icon={SpendIcon} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Pending Approvals" value={pendingRequests} icon={PendingIcon} color="warning" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Total Requests" value={totalRequests} icon={TotalIcon} color="primary" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Avg Approval Cycle" value="1.8 Days" icon={CycleIcon} color="info" />
        </Grid>
      </Grid>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {}
        <Grid size={{xs: 12, lg: 8}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Approved Budget Spend Trend (6 Months in Millions)
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <LineChart data={spendTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="Spend" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {}
        <Grid size={{xs: 12, lg: 4}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Supplier Partner Risk Profile
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={vendorRiskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {vendorRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
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
            Pending Review & Approval Queue
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentRequests.map((activity, index) => {
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
                  <Stack direction="row" spacing={3} alignItems="center" sx={{ ml: 2, flexShrink: 0 }}>
                    <Typography variant="body2" fontWeight={700}>
                      {activity.amount}
                    </Typography>
                    <Box
                      sx={{
                        px: 1.5, py: 0.5, borderRadius: 1,
                        bgcolor: alpha(actualColor, 0.1), color: actualColor,
                        fontSize: '11px', fontWeight: 700
                      }}
                    >
                      {activity.status}
                    </Box>
                  </Stack>
                </ListItem>
                {index < recentRequests.length - 1 && <Divider component="li" />}
              </Box>
            )
          })}
        </List>
      </Paper>
    </PageContainer>
  )
}
