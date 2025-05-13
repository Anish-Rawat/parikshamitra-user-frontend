"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Box, Card, CardContent, CardHeader, Typography, Tab, Tabs } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { getClassesMiddleware } from "@/utils/helper";
import { ClassInterface } from "@/common/interface";
import { useAppSelector } from "@/lib/hooks";
import { ACCESS_TOKEN } from "@/utils/constants";

export default function PreparationPage() {
  const [tabValue, setTabValue] = useState("classes");
  const dispatch = useDispatch<AppDispatch>();
  const {data:session} = useSession();
  const totalClassesAndStreams  = useAppSelector((state)=>state.class.data)
  const totalClasses = useMemo(()=>{
    const classes = totalClassesAndStreams?.filter((cls:ClassInterface)=>cls?.category==='class')
    return classes;
  },[totalClassesAndStreams])
  const totalStreams = useMemo(()=>{
    const streams = totalClassesAndStreams?.filter((cls:ClassInterface)=>cls?.category==='stream')
    return streams;
  },[totalClassesAndStreams])
  useEffect(()=>{
    getClassesMiddleware(dispatch,ACCESS_TOKEN)
  },[dispatch,ACCESS_TOKEN])
  
  const  ClassCategories = () => {  
    return (
      <>
        {totalClasses?.map((cls:ClassInterface) => (
          <Link href={`/preparation/class/${cls?.classId}`} key={cls?.classId}>
            <Card
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: "purple", boxShadow: 3 },
                cursor: "pointer",
              }}
            >
              <CardHeader
                title={<Typography variant="h6">{cls?.className} Class</Typography>}
                subheader={<Typography variant="body2">{cls?.totalSubjects} subjects available</Typography>}
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
  
  const  StreamCategories = () => {
    
    return (
      <>
        {totalStreams.map((stream: ClassInterface) => (
          <Link href={`/preparation/stream/${stream?.classId}`} key={stream?.classId}>
            <Card
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: "purple", boxShadow: 3 },
                cursor: "pointer",
              }}
            >
              <CardHeader
                title={<Typography variant="h6">{stream?.className}</Typography>}
                subheader={<Typography variant="body2">{stream?.totalSubjects} subjects available</Typography>}
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
