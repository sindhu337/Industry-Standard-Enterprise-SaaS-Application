import { Box, Container, Stack, Typography } from '@mui/material'

export default function AboutSection() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 10, md: 14 }, scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ maxWidth: 780, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main', fontWeight: 700 }}>
            About e-GRCP
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            A modern enterprise platform built for governance, risk, compliance, and procurement.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            e-GRCP brings together procurement orchestration, compliance monitoring, audit workflows, risk management, and secure role-based access into a unified workspace.
            Organizations rely on it to reduce operational complexity, preserve regulatory compliance, and deliver transparent governance at scale.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
