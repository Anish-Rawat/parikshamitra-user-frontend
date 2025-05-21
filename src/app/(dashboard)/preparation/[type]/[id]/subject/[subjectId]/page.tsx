'use client';

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Pagination,
  Breadcrumbs,
} from "@mui/material";
import { QuestionCard } from "@/components/questions/question-card";
import { useEffect, useState } from "react";
import {
  fetchQuestions,
  filteredSubjects,
  getClassesMiddleware,
} from "@/utils/helper";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/lib/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import NoData from "@/components/common/no-data";
import Loader from "@/components/common/loader";

interface SubjectQuestionsPageProps {
  params: {
    type: string;
    id: string;
    subjectId: string;
  };
}

export default function SubjectQuestionsPage({ params }: SubjectQuestionsPageProps) {
  const { type, id, subjectId } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficultyParam = (searchParams.get("difficulty") as "easy" | "medium" | "hard") || "easy";
  const pageParam = Number(searchParams.get("page")) || 1;

  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard">(difficultyParam);
  const [page, setPage] = useState(pageParam);

  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const accessToken = useAppSelector((state: RootState) => state.auth.tokens.accessToken);
  const totalClassesAndStreams = useAppSelector((state) => state.class.data);
  const subjects = useAppSelector((state) => state.subject.data);
  const questions = useAppSelector((state) => state.question.data);
  const isQuestionsListLoading = useAppSelector((state) => state.question.loading);
  const totalQuestions = useAppSelector((state) => state.question.totalQuestions);

  const limit = 10;
  const currentClassOrStream = totalClassesAndStreams?.find((item) => item.classId === id);
  const currentSubject = subjects?.find((item) => item.subjectId === subjectId);

  if (type !== "class" && type !== "stream") {
    notFound();
  }

  const updateUrl = (newDifficulty: string = difficultyLevel, newPage: number = page) => {
    router.push(`?difficulty=${newDifficulty}&page=${newPage}`);
  };

  useEffect(() => {
    if (accessToken) {
      getClassesMiddleware(dispatch, accessToken);
      filteredSubjects(dispatch, accessToken, id, page, limit);
    }
  }, [dispatch, id, accessToken, page]);

  useEffect(() => {
    if (accessToken) {
      fetchQuestions(dispatch, accessToken, id, subjectId, difficultyLevel, page, limit);
    }
  }, [dispatch, accessToken, id, subjectId, difficultyLevel, page]);

  useEffect(() => {
    setDifficultyLevel(difficultyParam);
    setPage(pageParam);
  }, [difficultyParam, pageParam]);

  let title = "";
  if (currentClassOrStream) {
    title = type === "class"
      ? `Class ${currentClassOrStream.className}`
      : `Stream ${currentClassOrStream.className}`;
  }

  const handleDifficultyLevelChange = (_: React.SyntheticEvent, newValue: "easy" | "medium" | "hard") => {
    setDifficultyLevel(newValue);
    updateUrl(newValue, 1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    updateUrl(difficultyLevel, newPage);
  };

  return (
    <Box className="container mx-auto p-4 md:p-6">
      <Box className="mb-6">
        <Breadcrumbs separator={<ChevronRight className="h-4 w-4" />} aria-label="breadcrumb">
          <Link href="/preparation" className="text-blue-600 hover:underline">Preparation</Link>
          <Link href={`/preparation/${type}/${id}`} className="text-blue-600 hover:underline">{title}</Link>
          <Typography color="text.primary">{currentSubject?.subjectName}</Typography>
        </Breadcrumbs>

        <Typography variant="h4" fontWeight="bold" className="mt-2">
          {currentSubject?.subjectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Practice questions by difficulty level
        </Typography>
      </Box>

      <Tabs
        value={difficultyLevel}
        onChange={handleDifficultyLevelChange}
        aria-label="Difficulty tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Easy" value="easy" />
        <Tab label="Medium" value="medium" />
        <Tab label="Hard" value="hard" />
      </Tabs>

      {isQuestionsListLoading ? (
        <Loader message="Fetching questions..." />
      ) : questions?.length > 0 ? (
        <Box>
          <Box className="grid gap-4">
            {questions.map((question, index) => (
              <QuestionCard
                key={question?.questionId}
                question={question}
                number={index + 1 + (page - 1) * limit}
              />
            ))}
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(totalQuestions / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              siblingCount={1}
            />
          </Box>
        </Box>
      ) : (
        <NoData message="No questions available for this difficulty level." />
      )}
    </Box>
  );
}
