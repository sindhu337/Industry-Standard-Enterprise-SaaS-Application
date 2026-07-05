import { Box, Container, Grid, Link, Stack, Typography, Divider } from '@mui/material'

const quickLinks = [
  { label: 'Features', anchor: '#features' },
  { label: 'Workflow', anchor: '#workflow' },
  { label: 'Roles', anchor: '#roles' },
  { label: 'Contact', anchor: '#about' },
]

export default function Footer() {
  return (
    <Box component="footer" id="contact" sx={{ bgcolor: 'text.primary', color: '#fff', py: { xs: 8, md: 10 }, scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={700} color="common.white">
                e-GRCP
              </Typography>
              <Typography variant="body2" color="grey.300">
                Enterprise governance, risk, compliance, and procurement for modern organizations.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.anchor} color="inherit" underline="hover" sx={{ fontSize: '0.95rem' }}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Contact & Academic Info
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="grey.300">
                Email: support@e-grcp.com
              </Typography>
              <Typography variant="body2" color="grey.300">
                College Name: [Your College Name]
              </Typography>
              <Typography variant="body2" color="grey.300">
                Student Name: [Your Name]
              </Typography>
              <Typography variant="body2" color="grey.300">
                Academic Year: [2025 - 2026]
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.12)' }} />

        <Typography variant="body2" color="grey.400" align="center">
          © {new Date().getFullYear()} e-GRCP. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}
