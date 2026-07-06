import { Box, Container, Stack, Typography, Grid, Paper, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import GroupsIcon from '@mui/icons-material/Groups'

export default function AboutSection() {
  const theme = useTheme()

  return (
    <Box component="section" id="about" sx={{ py: { xs: 12, md: 16 }, scrollMarginTop: { xs: 88, md: 96 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={3} sx={{ mx: 'auto', mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'primary.main', fontWeight: 700, display: 'block', mb: 1 }}>
              About e-GRCP
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.2, mb: 3 }}>
              Built for modern governance at scale.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem', mb: 2 }}>
              e-GRCP brings together procurement orchestration, compliance monitoring, audit workflows, risk management, and secure role-based access into a unified workspace.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              Organizations rely on it to reduce operational complexity, preserve regulatory compliance, and deliver transparent governance at enterprise scale without compromising speed or security.
            </Typography>
          </motion.div>
        </Stack>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: 'Unified Architecture',
              desc: 'Seamlessly integrates data from across the enterprise.',
              icon: <ArchitectureIcon />,
              color: 'primary',
            },
            {
              title: 'Team Collaboration',
              desc: 'Built to connect cross-functional teams effortlessly.',
              icon: <GroupsIcon />,
              color: 'secondary',
            },
            {
              title: 'Real-time Insights',
              desc: 'Make faster decisions with live analytics.',
              icon: <InfoOutlinedIcon />,
              color: 'success',
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 12px 32px ${theme.palette[item.color].main}20`,
                      borderColor: `${item.color}.main`
                    }
                  }}
                >
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${item.color}.light`, color: `${item.color}.main`, display: 'inline-flex' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
