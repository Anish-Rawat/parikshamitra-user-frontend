"use client"

import { Activity, Award, BarChart3, BookOpen } from "lucide-react"
import { Grid, Card, CardContent, Typography, Box } from "@mui/material"

export function PerformanceStats() {
  const stats = [
    {
      icon: <BookOpen style={{ height: 24, width: 24, color: "#9333ea" }} />,
      title: "Total Tests",
      value: "24",
      change: "+12% from last month",
      borderColor: "#9333ea", // purple-500
      bgColor: "#f3e8ff", // purple-100
      darkBgColor: "#6b21a8",
    },
    {
      icon: <Award style={{ height: 24, width: 24, color: "#3b82f6" }} />,
      title: "Average Score",
      value: "72.5%",
      change: "+3.2% from last month",
      borderColor: "#3b82f6", // blue-500
      bgColor: "#dbeafe", // blue-100
      darkBgColor: "#1e3a8a",
    },
    {
      icon: <BarChart3 style={{ height: 24, width: 24, color: "#22c55e" }} />,
      title: "Easy Level Score",
      value: "85.3%",
      change: "+5.7% from last month",
      borderColor: "#22c55e", // green-500
      bgColor: "#dcfce7", // green-100
      darkBgColor: "#166534",
    },
    {
      icon: <BarChart3 style={{ height: 24, width: 24, color: "#22c55e" }} />,
      title: "Medium Level Score",
      value: "70.3%",
      change: "+4.7% from last month",
      borderColor: "#FFF600", 
      bgColor: "#FFFF9F", 
      darkBgColor: "#166534",
    },
    {
      icon: <Activity style={{ height: 24, width: 24, color: "#f59e0b" }} />,
      title: "Hard Level Score",
      value: "64.8%",
      change: "+2.1% from last month",
      borderColor: "#f59e0b", // amber-500
      bgColor: "#fef3c7", // amber-100
      darkBgColor: "#78350f",
    },
  ]

  return (
    <Grid container spacing={2}>
      {stats.map((item, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          <Card
            sx={{
              overflow: "hidden",
              borderLeft: `4px solid ${item.borderColor}`,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    borderRadius: 2,
                    p: 1,
                    backgroundColor: item.bgColor,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight="500">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {item.change}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
