import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Box, Typography } from "@mui/material";

export function TestCompletionTrend() {
  const data = [
    { date: "Jan", tests: 3 },
    { date: "Feb", tests: 5 },
    { date: "Mar", tests: 7 },
    { date: "Apr", tests: 4 },
    { date: "May", tests: 8 },
    { date: "Jun", tests: 12 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          backgroundColor: 'white',
          p: 1.5,
          border: '1px solid #ccc',
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <Typography variant="body2" fontWeight="medium" mb={0.5}>
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${payload[0].value} tests completed`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 280, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            width={35}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="tests" 
            stroke="#9c27b0" 
            strokeWidth={3}
            dot={{ 
              r: 5,
              strokeWidth: 2,
              fill: "white",
              stroke: "#9c27b0"
            }} 
            activeDot={{ 
              r: 7,
              strokeWidth: 0,
              fill: "#9c27b0"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
