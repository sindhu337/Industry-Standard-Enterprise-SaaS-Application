import { Box, Paper, Typography, Tooltip } from '@mui/material';

const GRID_SIZE = 5;


function cellColor(prob, impact) {
  const score = prob * impact;
  if (score >= 15) return '#d32f2f';
  if (score >= 10) return '#f57c00';
  if (score >= 6) return '#fbc02d';
  if (score >= 3) return '#689f38';
  return '#388e3c';
}

function cellLabel(prob, impact) {
  const score = prob * impact;
  if (score >= 15) return 'Critical';
  if (score >= 10) return 'High';
  if (score >= 6) return 'Medium';
  return 'Low';
}

export default function RiskHeatmap({ risks = [] }) {

  const riskMap = {};
  risks.forEach((r) => {
    const key = `${r.probability}-${r.impact}`;
    if (!riskMap[key]) riskMap[key] = [];
    riskMap[key].push(r.title);
  });

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Risk Heatmap — Probability × Impact
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
        Each cell shows risk count. Hover for titles.
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ display: 'inline-block', minWidth: 320 }}>
          {}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box sx={{ width: 80, flexShrink: 0 }} />
            {Array.from({ length: GRID_SIZE }, (_, i) => i + 1).map((p) =>
            <Box key={p} sx={{ flex: 1, textAlign: 'center', minWidth: 56 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>P{p}</Typography>
              </Box>
            )}
          </Box>

          {}
          {Array.from({ length: GRID_SIZE }, (_, i) => GRID_SIZE - i).map((impact) =>
          <Box key={impact} sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Box sx={{ width: 80, flexShrink: 0, pr: 1, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Impact {impact}
                </Typography>
              </Box>
              {Array.from({ length: GRID_SIZE }, (_, j) => j + 1).map((prob) => {
              const key = `${prob}-${impact}`;
              const cellRisks = riskMap[key] || [];
              const bg = cellColor(prob, impact);
              const label = cellLabel(prob, impact);
              return (
                <Tooltip
                  key={prob}
                  title={
                  cellRisks.length > 0 ?
                  <><strong>{label}</strong><br />{cellRisks.join(', ')}</> :
                  label
                  }
                  arrow>
                  
                    <Box
                    sx={{
                      flex: 1, minWidth: 56, height: 52, borderRadius: 1.5,
                      bgcolor: bg, mx: 0.5, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'default',
                      opacity: cellRisks.length > 0 ? 1 : 0.35,
                      transition: 'transform 0.15s, opacity 0.15s',
                      border: cellRisks.length > 0 ? '2px solid rgba(0,0,0,0.18)' : 'none',
                      '&:hover': { transform: 'scale(1.08)', opacity: 1 }
                    }}>
                    
                      {cellRisks.length > 0 &&
                    <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#fff' }}>
                          {cellRisks.length}
                        </Typography>
                    }
                    </Box>
                  </Tooltip>);

            })}
            </Box>
          )}

          {}
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            {[
            { color: '#388e3c', label: 'Low' },
            { color: '#fbc02d', label: 'Medium' },
            { color: '#f57c00', label: 'High' },
            { color: '#d32f2f', label: 'Critical' }].
            map(({ color, label }) =>
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: 0.5, bgcolor: color }} />
                <Typography variant="caption" color="text.secondary">{label}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>);

}