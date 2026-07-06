import { Box, Container, Grid, Link, Stack, Typography, Divider } from '@mui/material'

const quickLinks = [
  { label: 'Features', anchor: '#features' },
  { label: 'Workflow', anchor: '#workflow' },
  { label: 'Roles', anchor: '#roles' },
  { label: 'Contact', anchor: '#about' },
]

export default function Footer() {
  return (
    <Box component="footer" id="contact" sx={{ bgcolor: 'text.primary', color: '#fff', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 }, scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1rem',
                  }}
                >
                  e
                </Box>
                <Typography variant="h6" fontWeight={800} color="common.white">
                  e-GRCP
                </Typography>
              </Box>
              <Typography variant="body2" color="grey.400" sx={{ lineHeight: 1.8, maxWidth: 360 }}>
                Enterprise governance, risk, compliance, and procurement for modern organizations. Redefining how teams orchestrate security and operations.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" fontWeight={800} color="common.white" gutterBottom>
              Platform
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.anchor} color="grey.400" underline="none" sx={{ fontSize: '0.95rem', transition: 'color 0.2s', '&:hover': { color: 'primary.light' } }}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ pl: { md: 6 } }}>
            <Typography variant="subtitle2" fontWeight={800} color="common.white" gutterBottom>
              Academic Details
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <Typography variant="body2" color="grey.400">
                Email: support@e-grcp.com
              </Typography>
              <Typography variant="body2" color="grey.400">
                College: Academic Project
              </Typography>
              <Typography variant="body2" color="grey.400">
                Student Name: [Your Name]
              </Typography>
              <Typography variant="body2" color="grey.400">
                Academic Year: 2025 - 2026
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} e-GRCP Platform. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="grey.500" underline="hover" variant="body2">Privacy Policy</Link>
            <Link href="#" color="grey.500" underline="hover" variant="body2">Terms of Service</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
