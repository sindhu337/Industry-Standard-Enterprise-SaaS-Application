import { Box, Paper, Typography, useTheme } from '@mui/material'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

export default function RiskTrendChart({ data = [] }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Risk Trend — Last 6 Months
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
        Monthly breakdown by severity level
      </Typography>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
          <defs>
            {[
              { id: 'critical', color: '#d32f2f' },
              { id: 'high',     color: '#f57c00' },
              { id: 'medium',   color: '#fbc02d' },
              { id: 'low',      color: '#388e3c' },
            ].map(({ id, color }) => (
              <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#eee'} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 8, fontSize: 13,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Area type="monotone" dataKey="critical" name="Critical" stroke="#d32f2f" fill="url(#grad-critical)" strokeWidth={2} />
          <Area type="monotone" dataKey="high"     name="High"     stroke="#f57c00" fill="url(#grad-high)"     strokeWidth={2} />
          <Area type="monotone" dataKey="medium"   name="Medium"   stroke="#fbc02d" fill="url(#grad-medium)"   strokeWidth={2} />
          <Area type="monotone" dataKey="low"      name="Low"      stroke="#388e3c" fill="url(#grad-low)"      strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  )
}
