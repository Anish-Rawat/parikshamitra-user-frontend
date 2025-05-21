'use client'

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
  Typography,
  Breadcrumbs,
  Chip,
  Box,
} from "@mui/material";
import { ChevronRight, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { filteredSubjects, getClassesMiddleware } from "@/utils/helper";

interface SubjectPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { type, id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const accessToken = useAppSelector((state: RootState) => state.auth.tokens.accessToken);
  const totalClassesAndStreams = useAppSelector((state) => state.class.data);
  const subjects = useAppSelector((state) => state.subject.data);

  const currentClassOrStream = totalClassesAndStreams?.find((item) => item.classId === id);

  useEffect(() => {
    if (accessToken) {
      getClassesMiddleware(dispatch, accessToken);
      filteredSubjects(dispatch, accessToken, id, 1, 10);
    }
  }, [dispatch, id, accessToken]);

  if (type !== "class" && type !== "stream") {
    notFound();
  }

  const title = currentClassOrStream
    ? `${type === "class" ? "Class" : "Stream"} ${currentClassOrStream.className}`
    : "";

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
      <Box mb={6}>
        <Breadcrumbs separator={<ChevronRight className="h-4 w-4" />} aria-label="breadcrumb">
          <Link href="/preparation" className="text-blue-600 hover:underline">
            Preparation
          </Link>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          📘 {title} Subjects
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose a subject to start your personalized practice.
        </Typography>
      </Box>

      <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects?.map((subject) => (
          <Link
            href={`/preparation/${type}/${id}/subject/${subject?.subjectId}?difficulty=easy&page=1`}
            key={subject?.subjectId}
          >
            <Card
              sx={{
                transition: "all 0.3s ease",
                borderRadius: 4,
                background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  background: "linear-gradient(135deg, #e0f7fa, #e8eaf6)",
                },
                height: "100%",
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardHeader
                  avatar={<BookOpen className="text-blue-600" />}
                  title={
                    <Typography variant="h6" fontWeight={600}>
                      {subject?.subjectName}
                    </Typography>
                  }
                  subheader={
                    <Chip
                      label={`${subject?.totalQuestionsByClassAndSubject} questions`}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Tap to start practicing
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<ChevronRight className="h-4 w-4" />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      color: "primary.main",
                      borderColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        borderColor: "primary.dark",
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
