import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'

const stats = [
  { value: '5+', label: 'User Roles' },
  { value: '20+', label: 'Enterprise Pages' },
  { value: '100%', label: 'Secure Role-Based Access' },
  { value: '24/7', label: 'Enterprise Ready' },
]

export default function StatisticsSection() {
  return (
    <Box component="section" id="statistics" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 640, mb: 6 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main', fontWeight: 700 }}>
            Platform Statistics
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Enterprise-grade scale and secure access for modern teams.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card sx={{ minHeight: 170, borderRadius: 3, bgcolor: 'primary.main', color: '#fff' }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h3" fontWeight={800}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="inherit" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
