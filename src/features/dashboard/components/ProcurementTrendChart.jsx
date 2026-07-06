import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { dashboardMockData } from '../data/dashboardMockData'

export default function ProcurementTrendChart() {
  const theme = useTheme()
  const data = dashboardMockData.procurementTrend

  return (
    <Card sx={{ borderRadius: 1.5, boxShadow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Procurement Request & Budget Trends
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Comparative view of monthly requests submitted versus volume approved
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area
                name="Submitted Requests"
                type="monotone"
                dataKey="requests"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRequests)"
              />
              <Area
                name="Approved Requests"
                type="monotone"
                dataKey="approved"
                stroke={theme.palette.success.main}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApproved)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
