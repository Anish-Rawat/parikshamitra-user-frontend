"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Card, CardContent, CardHeader, Typography, Tab, Tabs } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

export default function PreparationPage() {
  const [tabValue, setTabValue] = useState("classes");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box className="container mx-auto p-4 md:p-6">
      <Box className="flex flex-col gap-2">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Preparation
        </Typography>
        <Typography color="textSecondary">
          Select a category to start your exam preparation
        </Typography>
      </Box>

      <TabContext value={tabValue}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className="mt-6"
        >
          <Tab label="Classes" value="classes" />
          <Tab label="Streams" value="streams" />
        </Tabs>

        <Box className="mt-6">
          <TabPanel value="classes">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ClassCategories />
            </div>
          </TabPanel>

          <TabPanel value="streams">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StreamCategories />
            </div>
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

function ClassCategories() {
  const classes = [
    { id: 6, name: "Class 6", subjects: 8 },
    { id: 7, name: "Class 7", subjects: 9 },
    { id: 8, name: "Class 8", subjects: 10 },
    { id: 9, name: "Class 9", subjects: 12 },
    { id: 10, name: "Class 10", subjects: 12 },
  ];

  return (
    <>
      {classes.map((cls) => (
        <Link href={`/preparation/class/${cls.id}`} key={cls.id}>
          <Card
            sx={{
              transition: "all 0.3s",
              "&:hover": { borderColor: "purple", boxShadow: 3 },
              cursor: "pointer",
            }}
          >
            <CardHeader
              title={<Typography variant="h6">{cls.name}</Typography>}
              subheader={<Typography variant="body2">{cls.subjects} subjects available</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tap to explore subjects and start practicing
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}

function StreamCategories() {
  const streams = [
    { id: "non-medical", name: "Non-Medical", subjects: 5 },
    { id: "medical", name: "Medical", subjects: 6 },
    { id: "commerce", name: "Commerce", subjects: 7 },
    { id: "arts", name: "Arts", subjects: 8 },
  ];

  return (
    <>
      {streams.map((stream) => (
        <Link href={`/preparation/stream/${stream.id}`} key={stream.id}>
          <Card
            sx={{
              transition: "all 0.3s",
              "&:hover": { borderColor: "purple", boxShadow: 3 },
              cursor: "pointer",
            }}
          >
            <CardHeader
              title={<Typography variant="h6">{stream.name}</Typography>}
              subheader={<Typography variant="body2">{stream.subjects} subjects available</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tap to explore subjects and start practicing
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
