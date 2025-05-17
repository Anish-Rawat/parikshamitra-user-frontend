"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tabs, Tab, Box, Typography, Pagination } from "@mui/material";
import { QuestionCard } from "@/components/questions/question-card";
import { useEffect, useState } from "react";
import {
  fetchQuestions,
  filteredSubjects,
  getClassesMiddleware,
} from "@/utils/helper";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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
  // searchParams: {
  //   difficulty?: string
  //   page?: string
  // }
}

export default function SubjectQuestionsPage({
  params,
}: SubjectQuestionsPageProps) {
  const { type, id, subjectId } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficultyParam =
    (searchParams.get("difficulty") as "easy" | "medium" | "hard") || "easy";
  const pageParam = Number(searchParams.get("page")) || 1;
  const [difficultyLevel, setDifficultyLevel] = useState<
    "easy" | "medium" | "hard"
  >(difficultyParam);
  const [page, setPage] = useState(pageParam);
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const totalClassesAndStreams = useAppSelector((state) => state.class.data);
  const subjects = useAppSelector((state) => state.subject.data);
  const questions = useAppSelector((state) => state.question.data);
  const isQuestionsListLoading = useAppSelector(
    (state) => state.question.loading
  );
  console.log("isQuestionsListLoading", isQuestionsListLoading);
  const totalQuestions = useAppSelector(
    (state) => state.question.totalQuestions
  );
  const currentClassOrStream = totalClassesAndStreams?.find(
    (item) => item.classId === id
  );
  const currentSubject = subjects?.find((item) => item.subjectId === subjectId);
  const limit = 10;
  // Validate type
  if (type !== "class" && type !== "stream") {
    notFound();
  }
  // Update URL when page or difficulty changes
  const updateUrl = (
    newDifficulty: string = difficultyLevel,
    newPage: number = page
  ) => {
    router.push(`?difficulty=${newDifficulty}&page=${newPage}`);
  };
  console.log("questions", questions);
  useEffect(() => {
    if (accessToken) {
      getClassesMiddleware(dispatch, accessToken);
      filteredSubjects(dispatch, accessToken, id, page, limit);
    }
  }, [dispatch, id, accessToken, subjectId, difficultyParam, page]);
  useEffect(() => {
    console.log("Fetching que here", accessToken);
    if (accessToken) {
      fetchQuestions(
        dispatch,
        accessToken,
        id,
        subjectId,
        difficultyLevel,
        page,
        limit
      );
    }
  }, [dispatch, id, accessToken, subjectId, difficultyParam, page]);
  // Sync state with URL parameters on initial load and when URL changes
  useEffect(() => {
    setDifficultyLevel(difficultyParam);
    setPage(pageParam);
  }, [difficultyParam, pageParam]);

  let title;
  if (type === "class") {
    if (currentClassOrStream) {
      title = `Class ${currentClassOrStream?.className}`;
    } else {
      title = "";
    }
  } else if (type === "stream") {
    if (currentClassOrStream) {
      title = `Stream ${currentClassOrStream?.className}`;
    } else {
      title = "";
    }
  }
  const handleDifficultyLevelChange = (
    _event: React.SyntheticEvent,
    newValue: "easy" | "medium" | "hard"
  ) => {
    setDifficultyLevel(newValue);
    updateUrl(newValue, 1); // Reset to page 1 when changing difficulty
  };
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    updateUrl(difficultyLevel, newPage);
  };
  return (
    <Box className="container mx-auto p-4 md:p-6">
      <Box mb={6}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="0.875rem"
          color="text.secondary"
          mb={2}
        >
          <Link href="/preparation">Preparation</Link>
          <ChevronRight style={{ height: 16, width: 16 }} />
          <Link href={`/preparation/${type}/${id}`}>{title}</Link>
          <ChevronRight style={{ height: 16, width: 16 }} />
          <span>{currentSubject?.subjectName}</span>
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
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
        sx={{ marginTop: 2 }}
      >
        <Tab label="Easy" value="easy" />
        <Tab label="Medium" value="medium" />
        <Tab label="Hard" value="hard" />
      </Tabs>

      {isQuestionsListLoading ? (
        <Loader message="Fetching questions..." />
      ) : questions && questions.length > 0 ? (
        <Box sx={{ marginTop: 2 }}>
          {questions?.map((question, index) => (
            <QuestionCard
              key={question?.questionId}
              question={question}
              number={index + 1 + (page - 1) * 10}
            />
          ))}

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
        <NoData message="No Data Available" />
      )}
    </Box>
  );
}
