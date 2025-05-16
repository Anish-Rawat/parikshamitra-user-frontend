import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

export function ScoreByDifficulty() {
  const data = [
    {
      name: "Easy",
      score: 85.3,
      color: "#4caf50", // Green
    },
    {
      name: "Medium",
      score: 72.1,
      color: "#ff9800", // Orange
    },
    {
      name: "Hard",
      score: 64.8,
      color: "#f44336", // Red
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          backgroundColor: 'white',
          p: 1.5,
          border: '1px solid #ccc',
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <Typography variant="body2" fontWeight="medium">
            {`${payload[0].payload.name}: ${payload[0].value.toFixed(1)}%`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 280, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            width={35}
            tickCount={5}
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Bar 
            dataKey="score" 
            radius={[4, 4, 0, 0]}
            barSize={50}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}