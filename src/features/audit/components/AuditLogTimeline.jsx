import { Paper, Typography, Box, Chip } from '@mui/material';
import {
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as CriticalIcon } from
'@mui/icons-material';

const getLogIcon = (level) => {
  switch (level?.toLowerCase()) {
    case 'warning':
      return <WarningIcon fontSize="small" sx={{ color: 'warning.main' }} />;
    case 'critical':
      return <CriticalIcon fontSize="small" sx={{ color: 'error.main' }} />;
    default:
      return <InfoIcon fontSize="small" sx={{ color: 'primary.main' }} />;
  }
};

const getBorderColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'warning':
      return 'warning.main';
    case 'critical':
      return 'error.main';
    default:
      return 'divider';
  }
};

export default function AuditLogTimeline({ logs = [] }) {
  if (logs.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography variant="body2" color="text.secondary">No log activity recorded.</Typography>
      </Paper>);

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
      {logs.map((log, index) =>
      <Box
        key={log.id || index}
        sx={{
          display: 'flex',
          position: 'relative',
          pl: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 11,
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: 'divider',
            display: index === logs.length - 1 ? 'none' : 'block'
          }
        }}>
        
          {}
          <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 4,
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: getBorderColor(log.level),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
          
            {getLogIcon(log.level)}
          </Box>

          {}
          <Box sx={{ flexGrow: 1, pb: index === logs.length - 1 ? 0 : 2 }}>
            <Paper
            elevation={0}
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              bgcolor: 'background.paper',
              transition: 'box-shadow 0.2s',
              '&:hover': {
                boxShadow: 2
              }
            }}>
            
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {log.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {log.timestamp}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {log.module &&
                <Chip
                  label={log.module}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, borderRadius: 1 }} />

                }
                  {log.user &&
                <Chip
                  label={log.user}
                  size="small"
                  color="default"
                  sx={{ height: 20, fontSize: '0.65rem', fontWeight: 500, borderRadius: 1 }} />

                }
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {log.detail || log.description || log.ip}
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>);

}