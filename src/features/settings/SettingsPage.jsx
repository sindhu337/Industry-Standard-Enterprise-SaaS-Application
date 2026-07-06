import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box, Typography, Paper, Grid, Card, CardContent, Avatar,
  TextField, Button, Tabs, Tab, CircularProgress, InputAdornment, IconButton,
  Stack, Switch, Chip, Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import {
  Person as ProfileIcon,
  Security as SecurityIcon,
  Visibility,
  VisibilityOff,
  Save as SaveIcon,
  ManageAccounts as ManageAccountsIcon
} from '@mui/icons-material'

import PageContainer from '@/components/common/layout/PageContainer'
import { ROLES } from '@/constants/roles'
import usersData from '@/mocks/users.json'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  }
}

export default function SettingsPage() {
  const theme = useTheme()
  const { user } = useSelector((state) => state.auth)
  const isAdmin = user?.role === ROLES.ADMIN
  
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [users, setUsers] = useState(usersData)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => setIsUpdating(false), 800)
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => setIsUpdating(false), 800)
  }

  const toggleUserStatus = (id) => {
    setUsers((current) => current.map((item) => (item.id === id ? { ...item, status: item.status === 'Active' ? 'Disabled' : 'Active' } : item)))
  }

  return (
    <PageContainer>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h3" fontWeight={700}>
            Settings & Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Manage your account preferences, security, and administrative settings.
          </Typography>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 1.5, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1, bgcolor: 'background.paper' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
            <Tab icon={<ProfileIcon sx={{ mr: 1, mb: 0 }} fontSize="small" />} iconPosition="start" label="Profile Information" {...a11yProps(0)} sx={{ minHeight: 48, fontWeight: 600 }} />
            <Tab icon={<SecurityIcon sx={{ mr: 1, mb: 0 }} fontSize="small" />} iconPosition="start" label="Security" {...a11yProps(1)} sx={{ minHeight: 48, fontWeight: 600 }} />
            {isAdmin && (
              <Tab icon={<ManageAccountsIcon sx={{ mr: 1, mb: 0 }} fontSize="small" />} iconPosition="start" label="User Management" {...a11yProps(2)} sx={{ minHeight: 48, fontWeight: 600 }} />
            )}
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 120, height: 120, fontSize: '3rem', fontWeight: 'bold',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main', border: '2px solid', borderColor: 'primary.main'
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 1.5, px: 2, py: 0.5, fontWeight: 700 }}>
                    Change Avatar
                  </Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                <Box component="form" onSubmit={handleSaveProfile}>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Full Name" defaultValue={user?.name || ''} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Email Address" defaultValue={user?.email || ''} type="email" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Role" defaultValue={user?.role || 'Employee'} slotProps={{ input: { readOnly: true } }} disabled />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Department" defaultValue="Procurement" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Bio" multiline rows={3} placeholder="Tell us a bit about yourself..." />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit" variant="contained" disabled={isUpdating}
                        startIcon={isUpdating ? <CircularProgress size={16} /> : <SaveIcon />}
                        sx={{ mt: 2, borderRadius: 1.5, px: 3, py: 1, fontWeight: 700 }}
                      >
                        {isUpdating ? 'Saving...' : 'Save Profile'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          {}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Update Password
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Ensure your account is using a long, random password to stay secure.
                </Typography>

                <Box component="form" onSubmit={handleUpdatePassword}>
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth label="Current Password" type={showPassword ? 'text' : 'password'} required
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="New Password" type={showPassword ? 'text' : 'password'} required />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Confirm New Password" type={showPassword ? 'text' : 'password'} required />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit" variant="contained" disabled={isUpdating}
                        startIcon={isUpdating ? <CircularProgress size={16} /> : <SecurityIcon />}
                        sx={{ mt: 1, borderRadius: 1.5, px: 3, py: 1, fontWeight: 700 }}
                      >
                        {isUpdating ? 'Updating...' : 'Update Password'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                 <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Security Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage additional security safeguards for your account.
                </Typography>
                <Stack spacing={2}>
                  <Card variant="outlined" sx={{ borderRadius: 1.5 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Two-Factor Authentication (2FA)</Typography>
                        <Typography variant="body2" color="text.secondary">Add an extra layer of security to your account.</Typography>
                      </Box>
                      <Switch />
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ borderRadius: 1.5 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Sign-in Notifications</Typography>
                        <Typography variant="body2" color="text.secondary">Get alerted of unrecognized sign-ins.</Typography>
                      </Box>
                      <Switch defaultChecked />
                    </CardContent>
                  </Card>
                   <Card variant="outlined" sx={{ borderRadius: 1.5 }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Active Sessions</Typography>
                        <Typography variant="body2" color="text.secondary">Manage your current active sessions.</Typography>
                      </Box>
                      <Button variant="outlined" color="error" size="small" sx={{ borderRadius: 1.5, fontWeight: 700 }}>Revoke All</Button>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>

          {}
          {isAdmin && (
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Users</Typography>
                  <Typography variant="body2" color="text.secondary">Manage system users, roles, and access.</Typography>
                </Box>
                <Button variant="contained" sx={{ borderRadius: 1.5, px: 2, py: 0.5, fontWeight: 700 }}>
                  Add User
                </Button>
              </Box>
              <Box sx={{ width: '100%', overflowX: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: 'action.hover' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>User Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((userRow) => (
                      <TableRow key={userRow.id} hover>
                        <TableCell>{userRow.name}</TableCell>
                        <TableCell>{userRow.email}</TableCell>
                        <TableCell><Chip size="small" label={userRow.role} variant="outlined" sx={{ borderRadius: 1 }} /></TableCell>
                        <TableCell>{userRow.department}</TableCell>
                        <TableCell><Chip size="small" color={userRow.status === 'Active' ? 'success' : 'default'} label={userRow.status} sx={{ borderRadius: 1 }} /></TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button size="small" variant="outlined" sx={{ borderRadius: 1, fontWeight: 600 }}>Edit</Button>
                            <Button size="small" color={userRow.status === 'Active' ? 'error' : 'success'} variant="outlined" onClick={() => toggleUserStatus(userRow.id)} sx={{ borderRadius: 1, fontWeight: 600 }}>
                              {userRow.status === 'Active' ? 'Disable' : 'Enable'}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </TabPanel>
          )}
        </Box>
      </Paper>
    </PageContainer>
  )
}
