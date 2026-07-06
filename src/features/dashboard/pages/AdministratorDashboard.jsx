import { Box, Card, CardContent, Grid, Typography, Paper, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import {
  Group as UsersIcon,
  Devices as SessionsIcon,
  CheckCircle as UptimeIcon,
  Error as ErrorIcon,
  Warning as AlertIcon,
  Security as SecurityIcon,
  Update as UpdateIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material'


const systemUsageData = [
  { name: 'Mon', CPU: 42, Memory: 55, Network: 30 },
  { name: 'Tue', CPU: 48, Memory: 60, Network: 45 },
  { name: 'Wed', CPU: 65, Memory: 75, Network: 80 },
  { name: 'Thu', CPU: 50, Memory: 62, Network: 50 },
  { name: 'Fri', CPU: 55, Memory: 65, Network: 55 },
  { name: 'Sat', CPU: 30, Memory: 45, Network: 20 },
  { name: 'Sun', CPU: 25, Memory: 40, Network: 15 },
]

const roleDistributionData = [
  { name: 'Employees', value: 450, color: '#1976d2' },
  { name: 'Managers', value: 85, color: '#9c27b0' },
  { name: 'Auditors', value: 25, color: '#ed6c02' },
  { name: 'Admins', value: 12, color: '#d32f2f' },
]

const recentActivity = [
  { id: 1, type: 'alert', message: 'Failed login attempt detected from IP 192.168.1.55', time: '10 mins ago', icon: AlertIcon, color: 'error.main' },
  { id: 2, type: 'security', message: 'Firewall rules updated successfully', time: '1 hour ago', icon: SecurityIcon, color: 'success.main' },
  { id: 3, type: 'update', message: 'System background jobs completed in 4.2s', time: '3 hours ago', icon: UpdateIcon, color: 'info.main' },
  { id: 4, type: 'user', message: 'New user "alice_smith" provisioned in HR group', time: '5 hours ago', icon: PersonAddIcon, color: 'primary.main' },
]

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
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ 
            width: 48, height: 48, borderRadius: 2, 
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

export default function AdministratorDashboard() {
  const { user } = useSelector((state) => state.auth)
  const theme = useTheme()

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          Administrator Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          System overview, infrastructure health, and real-time security alerts.
        </Typography>
      </Box>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Total Users" value="572" icon={UsersIcon} color="primary" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Active Sessions" value="148" icon={SessionsIcon} color="info" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="System Uptime" value="99.98%" icon={UptimeIcon} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <StatCard title="Error Rate" value="0.04%" icon={ErrorIcon} color="error" />
        </Grid>
      </Grid>

      {}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {}
        <Grid size={{xs: 12, lg: 8}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              System Resource Usage (7 Days)
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <LineChart data={systemUsageData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.palette.text.secondary }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="CPU" stroke={theme.palette.primary.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                  <Line type="monotone" dataKey="Memory" stroke={theme.palette.secondary.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                  <Line type="monotone" dataKey="Network" stroke={theme.palette.success.main} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {}
        <Grid size={{xs: 12, lg: 4}}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              User Role Distribution
            </Typography>
            <Box sx={{ width: '100%', height: 300, mt: 2, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: theme.shadows[3] }}
                  />
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
            Recent System Activity
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            const [paletteKey, shade] = activity.color.split('.')
            const actualColor = theme.palette[paletteKey]?.[shade] || theme.palette.primary.main
            
            return (
              <Box key={activity.id}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.mode === 'dark' ? '#fff' : actualColor, 0.1), color: actualColor }}>
                      <Icon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<Typography variant="body2" fontWeight={600}>{activity.message}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{activity.time}</Typography>}
                  />
                </ListItem>
                {index < recentActivity.length - 1 && <Divider component="li" />}
              </Box>
            )
          })}
        </List>
      </Paper>
    </PageContainer>
  )
}
