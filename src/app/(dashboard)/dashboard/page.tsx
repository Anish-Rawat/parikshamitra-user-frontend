"use client";

import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Tabs, Tab, Box } from '@mui/material';
import { PerformanceStats } from "@/components/dashboard/performance-stats";
import { ScoreByDifficulty } from "@/components/dashboard/score-by-difficulty";
import { TestCompletionTrend } from "@/components/dashboard/test-completion-trend";
import { RecentTests } from "@/components/dashboard/recent-tests";
import { useState } from 'react';

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState('overview');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box className="container mx-auto p-4 md:p-6">
      <Box className="flex flex-col gap-2">
        <Typography variant="h4" component="h1" className="font-bold tracking-tight">Dashboard</Typography>
        <Typography variant="body2" color="textSecondary">Welcome back! Here&apos;s an overview of your exam preparation progress.</Typography>
      </Box>

      <Tabs 
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        className="mt-6"
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Performance" value="performance" />
        <Tab label="Recent Tests" value="recent" />
      </Tabs>

      <Box className="space-y-6">
        {tabValue === 'overview' && (
          <Box>
            <PerformanceStats />

            <Box className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Typography variant="h6">Score by Difficulty</Typography>
                </CardHeader>
                <CardContent>
                  <ScoreByDifficulty />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Typography variant="h6">Test Completion Trend</Typography>
                </CardHeader>
                <CardContent>
                  <TestCompletionTrend />
                </CardContent>
              </Card>
            </Box>

            <Card>
              <CardHeader>
                <Typography variant="h6">Recent Tests</Typography>
              </CardHeader>
              <CardContent>
                <RecentTests />
              </CardContent>
            </Card>
          </Box>
        )}

        {tabValue === 'performance' && (
          <Card>
            <CardHeader>
              <Typography variant="h6">Detailed Performance Analysis</Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" color="textSecondary">Detailed performance metrics will be displayed here.</Typography>
            </CardContent>
          </Card>
        )}

        {tabValue === 'recent' && (
          <Card>
            <CardHeader>
              <Typography variant="h6">All Recent Tests</Typography>
            </CardHeader>
            <CardContent>
              <RecentTests showAll />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
