import { Box, Card, CardContent, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Distinct User Roles' },
  { value: '25+', label: 'Enterprise Modules' },
  { value: '100%', label: 'Secure Architecture' },
  { value: '24/7', label: 'Real-time Analytics' },
]

export default function StatisticsSection() {
  const theme = useTheme()

  return (
    <Box component="section" id="statistics" sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2} sx={{ mb: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'primary.main', fontWeight: 700 }}>
              Enterprise Scale
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
              Built for performance and security.
            </Typography>
          </motion.div>
        </Stack>

        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    minHeight: 180, 
                    borderRadius: 2, 
                    bgcolor: 'primary.main', 
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 20px 40px ${theme.palette.primary.main}40`,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Stack spacing={1}>
                      <Typography variant="h2" fontWeight={900}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.8 }}>
                        {stat.label}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
