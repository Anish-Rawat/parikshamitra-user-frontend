import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Paper, Typography } from "@mui/material";

export function ScoreByDifficulty() {
  const data = [
    {
      name: "Easy",
      score: 85.3,
    },
    {
      name: "Medium",
      score: 72.1,
    },
    {
      name: "Hard",
      score: 64.8,
    },
  ];

  return (
    <Paper elevation={3} sx={{ height: 240, width: "100%", p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Score by Difficulty
      </Typography>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis width={40} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="score" fill="#9c27b0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
