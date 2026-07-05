import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {
  Assessment,
  Business,
  CheckCircle,
  FactCheck,
  PeopleAlt,
  Search,
  Security,
  Settings,
  ShoppingCart,
  VerifiedUser,
} from '@mui/icons-material'
import { BarChart, Bar, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageContainer from '@/components/common/layout/PageContainer'
import usersData from '@/mocks/users.json'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'
import vendorsData from '@/mocks/vendors.json'
import { ROLES } from '@/constants/roles'

const tabLabels = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'users', label: 'User Management' },
  { value: 'settings', label: 'System Settings' },
  { value: 'reports', label: 'Reports Center' },
  { value: 'search', label: 'Global Search' },
]

const metricCards = [
  { key: 'users', label: 'Total Users', valueKey: 'totalUsers', icon: PeopleAlt, color: 'primary.main' },
  { key: 'procurement', label: 'Total Procurement Requests', valueKey: 'totalProcurementRequests', icon: ShoppingCart, color: 'info.main' },
  { key: 'approved', label: 'Approved Requests', valueKey: 'approvedRequests', icon: CheckCircle, color: 'success.main' },
  { key: 'compliance', label: 'Compliance Rate', valueKey: 'complianceRate', icon: VerifiedUser, color: 'secondary.main' },
  { key: 'audit', label: 'Audit Completion Rate', valueKey: 'auditCompletionRate', icon: FactCheck, color: 'warning.main' },
  { key: 'vendors', label: 'Active Vendors', valueKey: 'activeVendors', icon: Business, color: 'error.main' },
]

const settingsPanels = [
  { value: 'profile', label: 'Profile Settings', description: 'Keep administrator identity and contact details current.' },
  { value: 'theme', label: 'Theme Settings', description: 'Adjust the visual experience for the enterprise workspace.' },
  { value: 'notifications', label: 'Notification Preferences', description: 'Control the delivery of critical policy and workflow updates.' },
  { value: 'security', label: 'Security Settings', description: 'Manage password, session, and access safeguards.' },
]

const chartData = [
  { name: 'Procurement', value: 84 },
  { name: 'Compliance', value: 91 },
  { name: 'Audit', value: 76 },
  { name: 'Users', value: 88 },
]

const pieData = [
  { name: 'Approved', value: 24 },
  { name: 'Pending', value: 10 },
  { name: 'Requires Review', value: 6 },
]

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02']

export default function AdminWorkspacePage() {
  const { user } = useSelector((state) => state.auth || {})
    const procurementItems = useSelector((state) => state.procurement?.items) || PROCUREMENT_MOCK_DATA
    const vendorItems = useSelector((state) => state.vendors?.items) || vendorsData

  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState(usersData)
  const [feedback, setFeedback] = useState('Administrator workspace ready for review.')
  const [selectedSetting, setSelectedSetting] = useState('profile')

  const totalUsers = users.length
  const totalProcurementRequests = procurementItems.length
  const approvedRequests = procurementItems.filter((item) => item.status === 'Approved').length
  const complianceRate = Math.round((procurementItems.filter((item) => item.complianceStatus === 'Compliant').length / Math.max(totalProcurementRequests, 1)) * 100)
  const auditCompletionRate = Math.round((procurementItems.filter((item) => item.auditStatus === 'Audited').length / Math.max(totalProcurementRequests, 1)) * 100)
  const activeVendors = vendorItems.filter((vendor) => vendor.status === 'Active').length

  const metrics = useMemo(() => ({
    totalUsers,
    totalProcurementRequests,
    approvedRequests,
    complianceRate,
    auditCompletionRate,
    activeVendors,
  }), [activeVendors, approvedRequests, auditCompletionRate, complianceRate, totalProcurementRequests, totalUsers])

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return { users: [], procurements: [], vendors: [] }
    }

    return {
      users: users.filter((item) => `${item.name} ${item.email} ${item.department}`.toLowerCase().includes(term)).slice(0, 5),
      procurements: procurementItems.filter((item) => `${item.id} ${item.title} ${item.requestedBy} ${item.vendor}`.toLowerCase().includes(term)).slice(0, 5),
      vendors: vendorItems.filter((item) => `${item.name} ${item.category} ${item.contactPerson}`.toLowerCase().includes(term)).slice(0, 5),
    }
  }, [procurementItems, searchTerm, users, vendorItems])

  const simulateAction = (action) => {
    setFeedback(`${action} action simulated for this administrator workspace.`)
  }

  const toggleUserStatus = (id) => {
    setUsers((current) => current.map((item) => (item.id === id ? { ...item, status: item.status === 'Active' ? 'Disabled' : 'Active' } : item)))
    setFeedback('User status updated locally in mock administration mode.')
  }

  return (
    <PageContainer sx={{ py: 3, gap: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700}>Administrator Workspace</Typography>
          <Typography variant="h4" fontWeight={800}>Operations, controls, and oversight</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Welcome back, {user?.name || 'Administrator'}. You can review governance health, manage users, and inspect platform settings.
          </Typography>
        </Box>
        <Chip label="Admin Access: Full module access" color="primary" variant="outlined" />
      </Stack>

      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {tabLabels.map((tab) => <Tab key={tab.value} value={tab.value} label={tab.label} />)}
      </Tabs>

      {feedback ? <Alert severity="info">{feedback}</Alert> : null}

      {activeTab === 'dashboard' ? (
        <Box>
          <Grid container spacing={2}>
            {metricCards.map(({ key, label, valueKey, icon: Icon, color }) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon sx={{ color }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight={800}>{metrics[valueKey]}</Typography>
                      <Typography variant="body2" color="text.secondary">{label}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Governance Health Overview</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Mock summary across procurement, compliance, audits, and user operations.</Typography>
                <Box sx={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#1976d2" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Approval Distribution</Typography>
                <Box sx={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55}>
                        {pieData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {activeTab === 'users' ? (
        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>User Management</Typography>
              <Typography variant="body2" color="text.secondary">Mock view and state changes for administrator-managed accounts.</Typography>
            </Box>
            <Button variant="outlined" onClick={() => simulateAction('Refresh')}>Refresh View</Button>
          </Stack>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userRow) => (
                <TableRow key={userRow.id} hover>
                  <TableCell>{userRow.name}</TableCell>
                  <TableCell>{userRow.email}</TableCell>
                  <TableCell><Chip size="small" label={userRow.role} variant="outlined" /></TableCell>
                  <TableCell>{userRow.department}</TableCell>
                  <TableCell><Chip size="small" color={userRow.status === 'Active' ? 'success' : 'default'} label={userRow.status} /></TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" onClick={() => simulateAction('View')}>View</Button>
                      <Button size="small" variant="outlined" onClick={() => simulateAction('Edit')}>Edit</Button>
                      <Button size="small" color={userRow.status === 'Active' ? 'warning' : 'success'} variant="contained" onClick={() => toggleUserStatus(userRow.id)}>
                        {userRow.status === 'Active' ? 'Disable' : 'Enable'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : null}

      {activeTab === 'settings' ? (
        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ minWidth: 220 }}>
              <Typography variant="h6" fontWeight={700}>System Settings</Typography>
              <Typography variant="body2" color="text.secondary">Mock administrator controls for the platform experience.</Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {settingsPanels.map((panel) => (
                <Button key={panel.value} size="small" variant={selectedSetting === panel.value ? 'contained' : 'outlined'} onClick={() => setSelectedSetting(panel.value)}>
                  {panel.label}
                </Button>
              ))}
            </Stack>
          </Stack>

          {selectedSetting === 'profile' ? (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Profile Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Administrator profile and contact configuration.</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}><TextField fullWidth label="Display Name" defaultValue={user?.name || 'Administrator'} /></Grid>
                  <Grid item xs={12} md={6}><TextField fullWidth label="Work Email" defaultValue={user?.email || 'admin@egrcp.com'} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : null}

          {selectedSetting === 'theme' ? (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Theme Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>The enterprise theme remains consistent with the rest of the application.</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable compact density" />
              </CardContent>
            </Card>
          ) : null}

          {selectedSetting === 'notifications' ? (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Notification Preferences</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Set how approvals, compliance, and audit updates are surfaced.</Typography>
                <Stack spacing={1}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Approval reminders" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Compliance escalations" />
                  <FormControlLabel control={<Switch />} label="Weekly digest" />
                </Stack>
              </CardContent>
            </Card>
          ) : null}

          {selectedSetting === 'security' ? (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Security Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Mock security policies for privileged administration access.</Typography>
                <Stack spacing={1}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Require MFA for admin sessions" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Monitor unusual sign-in activity" />
                  <FormControlLabel control={<Switch />} label="Enable temporary access links" />
                </Stack>
              </CardContent>
            </Card>
          ) : null}
        </Paper>
      ) : null}

      {activeTab === 'reports' ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Procurement Summary</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Approved and pending request mix.</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow><TableCell>Metric</TableCell><TableCell align="right">Value</TableCell></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow><TableCell>Completed</TableCell><TableCell align="right">{approvedRequests}</TableCell></TableRow>
                    <TableRow><TableCell>Pending</TableCell><TableCell align="right">{totalProcurementRequests - approvedRequests}</TableCell></TableRow>
                    <TableRow><TableCell>Compliance Rate</TableCell><TableCell align="right">{complianceRate}%</TableCell></TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Compliance Summary</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Mock compliance posture view.</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow><TableCell>Item</TableCell><TableCell align="right">Status</TableCell></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow><TableCell>Policy Review</TableCell><TableCell align="right"><Chip size="small" color="success" label="Healthy" /></TableCell></TableRow>
                    <TableRow><TableCell>Vendor Checks</TableCell><TableCell align="right"><Chip size="small" color="warning" label="Needs Follow-up" /></TableCell></TableRow>
                    <TableRow><TableCell>Audit Readiness</TableCell><TableCell align="right"><Chip size="small" color="primary" label="On Track" /></TableCell></TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Audit Summary</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Current audit completion snapshot.</Typography>
                <Typography variant="h4" fontWeight={800}>{auditCompletionRate}%</Typography>
                <Typography variant="body2" color="text.secondary">Reviewed requests are marked as audited in mock flow.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>User Summary</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Latest administration coverage.</Typography>
                <Typography variant="h4" fontWeight={800}>{totalUsers}</Typography>
                <Typography variant="body2" color="text.secondary">Accounts available for management and review.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {activeTab === 'search' ? (
        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>Global Search</Typography>
              <Typography variant="body2" color="text.secondary">Search across users, procurement requests, and vendors using mock records.</Typography>
            </Box>
            <TextField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search users, requests, or vendors"
              slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> } }}
              sx={{ minWidth: { xs: '100%', md: 320 } }}
            />
          </Stack>

          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={700}>Users</Typography>
                {searchResults.users.length > 0 ? searchResults.users.map((item) => <Typography key={item.id} variant="body2" sx={{ py: 0.5 }}>{item.name} — {item.email}</Typography>) : <Typography variant="body2" color="text.secondary">No user matches.</Typography>}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={700}>Procurement Requests</Typography>
                {searchResults.procurements.length > 0 ? searchResults.procurements.map((item) => <Typography key={item.id} variant="body2" sx={{ py: 0.5 }}>{item.title} ({item.id})</Typography>) : <Typography variant="body2" color="text.secondary">No procurement matches.</Typography>}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={700}>Vendors</Typography>
                {searchResults.vendors.length > 0 ? searchResults.vendors.map((item) => <Typography key={item.id} variant="body2" sx={{ py: 0.5 }}>{item.name} — {item.category}</Typography>) : <Typography variant="body2" color="text.secondary">No vendor matches.</Typography>}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      ) : null}
    </PageContainer>
  )
}
