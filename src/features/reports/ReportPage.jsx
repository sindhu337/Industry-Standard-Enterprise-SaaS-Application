import { Box, Typography, Button, Grid, Card, CardContent, Stack, Divider } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import {
  Assessment as AssessmentIcon,
  BarChart as ChartIcon,
  Security as SecurityIcon,
  Gavel as GavelIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
} from '@mui/icons-material'
import PageContainer from '@/components/common/layout/PageContainer'
import { downloadCSV, downloadPDF } from './utils/exportUtils'
import { 
  PROCUREMENT_SUMMARY_MOCK, 
  VENDOR_MATRIX_MOCK, 
  RISK_REGISTER_MOCK, 
  COMPLIANCE_VIOLATION_MOCK, 
  SYSTEM_AUDIT_LOGS_MOCK 
} from './data/reportMockData'

const reportsConfig = [
  { 
    title: 'Global Procurement Summary', 
    description: 'Comprehensive report of all procurement requests, spending, and approval times.', 
    icon: ChartIcon, 
    color: 'primary',
    data: PROCUREMENT_SUMMARY_MOCK,
    columns: [
      { field: 'id', headerName: 'ID' },
      { field: 'title', headerName: 'Title' },
      { field: 'department', headerName: 'Department' },
      { field: 'budget', headerName: 'Budget' },
      { field: 'status', headerName: 'Status' },
      { field: 'approvalTime', headerName: 'Approval Time' },
    ],
    filename: 'procurement-summary'
  },
  { 
    title: 'Vendor Performance & Risk Matrix', 
    description: 'Detailed analysis of active vendors, their ratings, and associated risks.', 
    icon: AssessmentIcon, 
    color: 'info',
    data: VENDOR_MATRIX_MOCK,
    columns: [
      { field: 'vendor', headerName: 'Vendor Name' },
      { field: 'category', headerName: 'Category' },
      { field: 'rating', headerName: 'Performance Rating' },
      { field: 'activeContracts', headerName: 'Active Contracts' },
      { field: 'riskLevel', headerName: 'Risk Level' },
    ],
    filename: 'vendor-performance-risk'
  },
  { 
    title: 'Enterprise Risk Register', 
    description: 'Export of all identified risks across departments, including likelihood and impact.', 
    icon: SecurityIcon, 
    color: 'error',
    data: RISK_REGISTER_MOCK,
    columns: [
      { field: 'riskId', headerName: 'Risk ID' },
      { field: 'department', headerName: 'Department' },
      { field: 'description', headerName: 'Description' },
      { field: 'likelihood', headerName: 'Likelihood' },
      { field: 'impact', headerName: 'Impact' },
      { field: 'status', headerName: 'Status' },
    ],
    filename: 'enterprise-risk-register'
  },
  { 
    title: 'Compliance Violation Logs', 
    description: 'Audit trail of expired certifications and non-compliant vendors.', 
    icon: GavelIcon, 
    color: 'warning',
    data: COMPLIANCE_VIOLATION_MOCK,
    columns: [
      { field: 'entity', headerName: 'Entity' },
      { field: 'type', headerName: 'Violation Type' },
      { field: 'date', headerName: 'Date' },
      { field: 'severity', headerName: 'Severity' },
      { field: 'status', headerName: 'Status' },
    ],
    filename: 'compliance-violations'
  },
  { 
    title: 'System Audit Logs', 
    description: 'Comprehensive log of system activities, logins, and data modifications.', 
    icon: DocIcon, 
    color: 'success',
    data: SYSTEM_AUDIT_LOGS_MOCK,
    columns: [
      { field: 'timestamp', headerName: 'Timestamp' },
      { field: 'user', headerName: 'User' },
      { field: 'action', headerName: 'Action' },
      { field: 'module', headerName: 'Module' },
      { field: 'ip', headerName: 'IP Address' },
    ],
    filename: 'system-audit-logs'
  },
]

export default function ReportPage() {
  const theme = useTheme()

  const handleExportCSV = (report) => {
    downloadCSV(report.data, report.filename)
  }

  const handleExportPDF = (report) => {
    downloadPDF(report.title, report.columns, report.data, report.filename)
  }

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>Report Generation Center</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Export detailed system reports in CSV or PDF format across all governance modules.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {reportsConfig.map((mod) => {
          const IconComp = mod.icon
          const colorMain = theme.palette[mod.color]?.main || theme.palette.primary.main
          return (
            <Grid size={{xs: 12, sm: 6, md: 4}} key={mod.title}>
              <Card
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: colorMain,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${alpha(colorMain, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                    <Box sx={{
                      width: 48, height: 48, borderRadius: 1.5,
                      bgcolor: alpha(colorMain, 0.1), color: colorMain,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <IconComp fontSize="medium" />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {mod.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3 }}>
                    {mod.description}
                  </Typography>
                  <Divider sx={{ mb: 2, mx: -3 }} />
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      size="small" 
                      startIcon={<CsvIcon />}
                      onClick={() => handleExportCSV(mod)}
                      sx={{ flexGrow: 1, borderColor: 'divider', color: 'text.secondary', '&:hover': { color: 'text.primary', borderColor: 'text.primary' } }}
                    >
                      Export CSV
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      size="small" 
                      startIcon={<PdfIcon />}
                      onClick={() => handleExportPDF(mod)}
                      sx={{ flexGrow: 1, borderColor: 'divider', color: 'text.secondary', '&:hover': { color: 'text.primary', borderColor: 'text.primary' } }}
                    >
                      Export PDF
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </PageContainer>
  )
}
