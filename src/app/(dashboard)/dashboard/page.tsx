"use client";

import { Card, CardContent, CardHeader, Typography, Box, Tabs, Tab } from '@mui/material';
import { PerformanceStats } from "@/components/dashboard/performance-stats";
import { ScoreByDifficulty } from "@/components/dashboard/score-by-difficulty";
import { TestCompletionTrend } from "@/components/dashboard/test-completion-trend";
import { RecentTests } from "@/components/dashboard/recent-tests";
import { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState('overview');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box className="container mx-auto p-6">
      <Box className="flex flex-col gap-3 mb-8">
        <Typography variant="h4" component="h1" className="font-bold tracking-tight">
          Student Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here&apos;s an overview of your exam preparation progress.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="dashboard tabs"
        >
          <Tab 
            icon={<TrendingUpIcon />} 
            iconPosition="start" 
            label="Overview" 
            value="overview" 
          />
          <Tab 
            icon={<BarChartIcon />} 
            iconPosition="start" 
            label="Performance" 
            value="performance" 
          />
          <Tab 
            icon={<AssignmentIcon />} 
            iconPosition="start" 
            label="Recent Tests" 
            value="recent" 
          />
        </Tabs>
      </Box>

      {tabValue === 'overview' && (
        <Box className="space-y-8">
          <PerformanceStats />

          <Typography variant="h6" className="font-semibold mb-4 px-1">
            Performance Analysis
          </Typography>
          
          <Box className="grid gap-6 md:grid-cols-2">
            <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <CardHeader 
                title="Score by Difficulty"
                titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
                sx={{ backgroundColor: 'rgba(156, 39, 176, 0.04)', pb: 1 }}
              />
              <CardContent sx={{ pt: 2 }}>
                <ScoreByDifficulty />
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <CardHeader 
                title="Test Completion Trend"
                titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
                sx={{ backgroundColor: 'rgba(156, 39, 176, 0.04)', pb: 1 }}
              />
              <CardContent sx={{ pt: 2 }}>
                <TestCompletionTrend />
              </CardContent>
            </Card>
          </Box>

          <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mt: 4 }}>
            <CardHeader 
              title="Recent Tests"
              titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
              sx={{ backgroundColor: 'rgba(156, 39, 176, 0.04)', pb: 1 }}
            />
            <CardContent>
              <RecentTests />
            </CardContent>
          </Card>
        </Box>
      )}

      {tabValue === 'performance' && (
        <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <CardHeader 
            title="Detailed Performance Analysis"
            titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
            sx={{ backgroundColor: 'rgba(156, 39, 176, 0.04)', pb: 1 }}
          />
          <CardContent sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <Typography variant="body1" color="text.secondary">
                Detailed performance metrics will be displayed here.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 'recent' && (
        <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <CardHeader 
            title="All Recent Tests"
            titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
            sx={{ backgroundColor: 'rgba(156, 39, 176, 0.04)', pb: 1 }}
          />
          <CardContent>
            <RecentTests showAll />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
