import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { dashboardMockData } from '../data/dashboardMockData'

export default function ComplianceStatusChart() {
  const theme = useTheme()
  const data = dashboardMockData.complianceStatus

  return (
    <Card sx={{ borderRadius: 2.5, boxShadow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Compliance Status Rates (%)
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Percentage breakdown of requirements currently met by suppliers
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
