import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { dashboardMockData } from '../data/dashboardMockData'

export default function RiskDistributionChart() {
  const theme = useTheme()
  const data = dashboardMockData.riskDistribution

  return (
    <Card sx={{ borderRadius: 2.5, boxShadow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Organizational Risk Distribution
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Distribution breakdown of logged risks based on danger classification
        </Typography>
        <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
