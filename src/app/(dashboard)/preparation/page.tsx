"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tab,
  Tabs,
  Chip,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { getClassesMiddleware } from "@/utils/helper";
import { ClassInterface } from "@/common/interface";
import { useAppSelector } from "@/lib/hooks";
import Loader from "@/components/common/loader";
import SchoolIcon from "@mui/icons-material/School";
import StreamIcon from "@mui/icons-material/Timeline";

export default function PreparationPage() {
  const [tabValue, setTabValue] = useState("classes");
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const accessToken = useAppSelector((state: RootState) => state.auth.tokens.accessToken);

  const totalClassesAndStreams = useAppSelector((state) => state.class.data);
  const isClassesAndStreamsLoading = useAppSelector((state) => state.class.loading);

  const totalClasses = useMemo(
    () => totalClassesAndStreams?.filter((cls: ClassInterface) => cls?.category === "class"),
    [totalClassesAndStreams]
  );
  const totalStreams = useMemo(
    () => totalClassesAndStreams?.filter((cls: ClassInterface) => cls?.category === "stream"),
    [totalClassesAndStreams]
  );

  useEffect(() => {
    if (accessToken) {
      getClassesMiddleware(dispatch, accessToken);
    }
  }, [dispatch, accessToken]);

  const renderCard = (item: ClassInterface, isStream: boolean) => (
    <Link
      href={`/preparation/${isStream ? "stream" : "class"}/${item?.classId}`}
      key={item?.classId}
    >
      <Card
        sx={{
          transition: "0.3s",
          borderRadius: 4,
          p: 2,
          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
            background: "linear-gradient(135deg, #e0f7fa, #e8eaf6)",
          },
          cursor: "pointer",
        }}
      >
        <CardHeader
          avatar={isStream ? <StreamIcon color="primary" /> : <SchoolIcon color="primary" />}
          title={
            <Typography variant="h6" fontWeight={600}>
              {item?.className} {isStream ? "" : "Class"}
            </Typography>
          }
          subheader={
            <Chip
              size="small"
              label={`${item?.totalSubjects} subjects`}
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Tap to explore subjects and start practicing
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box
      className="container mx-auto"
      sx={{
        px: { xs: 2, sm: 4 },
        py: 6,
        background: "linear-gradient(to right, #f9fafb, #f1f5f9)",
        minHeight: "100vh",
      }}
    >
      <Box mb={4}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          📚 Preparation Portal
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose a category to kickstart your exam preparation journey.
        </Typography>
      </Box>

      <TabContext value={tabValue}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            mb: 4,
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              px: 3,
            },
          }}
        >
          <Tab label="Classes" value="classes" />
          <Tab label="Streams" value="streams" />
        </Tabs>

        {isClassesAndStreamsLoading ? (
          <Loader message="Fetching Classes..." />
        ) : (
          <Box mt={2}>
            <TabPanel value="classes">
              <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {totalClasses?.map((cls) => renderCard(cls, false))}
              </Box>
            </TabPanel>
            <TabPanel value="streams">
              <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {totalStreams?.map((stream) => renderCard(stream, true))}
              </Box>
            </TabPanel>
          </Box>
        )}
      </TabContext>
    </Box>
  );
}
