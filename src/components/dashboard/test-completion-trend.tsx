import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Paper, Typography } from "@mui/material";

export function TestCompletionTrend() {
  const data = [
    { date: "Jan", tests: 3 },
    { date: "Feb", tests: 5 },
    { date: "Mar", tests: 7 },
    { date: "Apr", tests: 4 },
    { date: "May", tests: 8 },
    { date: "Jun", tests: 12 },
  ];

  return (
    <Paper elevation={3} sx={{ height: 240, width: "100%", p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Test Completion Trend
      </Typography>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis width={40} />
          <Tooltip formatter={(value: number) => `${value} tests`} />
          <Line type="monotone" dataKey="tests" stroke="#9c27b0" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
