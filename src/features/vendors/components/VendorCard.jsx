import {
  Box, Grid, Paper, Typography, Divider, Chip, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Skeleton,
} from '@mui/material'
import {
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Description as DocIcon,
  Assignment as ContractIcon,
  Flag as FlagIcon,
} from '@mui/icons-material'
import { VendorStatusChip, VendorRiskChip } from './VendorStatusChip'

function Stat({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={700}>
        {value ?? '—'}
      </Typography>
    </Box>
  )
}

export default function VendorCard({ vendor, loading = false }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="rounded" height={180} />
        <Skeleton variant="rounded" height={180} />
      </Box>
    )
  }
  if (!vendor) return null

  return (
    <Grid container spacing={3}>
      {/* Profile */}
      <Grid item xs={12} md={5}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 24, fontWeight: 700 }}>
              {vendor.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>{vendor.name}</Typography>
              <Typography variant="caption" color="text.secondary">{vendor.registrationNumber}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <VendorStatusChip status={vendor.status} />
            <VendorRiskChip level={vendor.riskLevel} />
            <Chip label={vendor.category} size="small" variant="outlined" sx={{ borderRadius: 1.5 }} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" fontWeight={700} gutterBottom>Contact</Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}><BusinessIcon fontSize="small" color="action" /></ListItemIcon>
              <ListItemText primary={vendor.contactName} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}><EmailIcon fontSize="small" color="action" /></ListItemIcon>
              <ListItemText primary={vendor.contactEmail} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 32 }}><PhoneIcon fontSize="small" color="action" /></ListItemIcon>
              <ListItemText primary={vendor.contactPhone} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>Key Dates</Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={6}><Stat label="Onboarded" value={vendor.onboardedDate} /></Grid>
            <Grid item xs={6}><Stat label="Last Review" value={vendor.lastReviewDate || 'N/A'} /></Grid>
            <Grid item xs={6}><Stat label="Next Review" value={vendor.nextReviewDate} /></Grid>
            <Grid item xs={6}><Stat label="Country" value={vendor.country} /></Grid>
          </Grid>

          {vendor.notes && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary" display="block" fontStyle="italic">
                {vendor.notes}
              </Typography>
            </>
          )}
        </Paper>
      </Grid>

      {/* Stats + Contracts */}
      <Grid item xs={12} md={7}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* KPI row */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Performance Overview</Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={6} sm={3}>
                <Stat label="Total Contracts" value={vendor.totalContracts} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Stat label="Active" value={vendor.activeContracts} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Stat label="Total Spend" value={`$${(vendor.totalSpend / 1000000).toFixed(2)}M`} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Stat label="Compliance" value={`${vendor.complianceScore}%`} />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Compliance Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={vendor.complianceScore}
                color={vendor.complianceScore >= 85 ? 'success' : vendor.complianceScore >= 65 ? 'warning' : 'error'}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Paper>

          {/* Contracts */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Contract History</Typography>
            {vendor.contracts?.length ? (
              <List dense disablePadding>
                {vendor.contracts.map((c, i) => (
                  <Box key={c.id}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><ContractIcon fontSize="small" color="action" /></ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={600}>{c.title}</Typography>}
                        secondary={`${c.startDate} → ${c.endDate} · $${(c.value / 1000).toFixed(0)}K`}
                      />
                      <Chip
                        label={c.status}
                        size="small"
                        color={c.status === 'Active' ? 'success' : c.status === 'Completed' ? 'default' : 'error'}
                        sx={{ borderRadius: 1.5, fontWeight: 600 }}
                      />
                    </ListItem>
                    {i < vendor.contracts.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No contract history available.</Typography>
            )}
          </Paper>

          {/* Documents */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Documents</Typography>
            {vendor.documents?.length ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {vendor.documents.map((doc) => (
                  <Chip
                    key={doc}
                    icon={<DocIcon />}
                    label={doc}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1.5 }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No documents on file.</Typography>
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}
