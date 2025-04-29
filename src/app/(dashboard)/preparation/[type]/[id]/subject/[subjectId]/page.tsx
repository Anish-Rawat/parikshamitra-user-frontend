"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Tabs, Tab, Box, Typography, Pagination } from "@mui/material"
import { QuestionCard } from "@/components/questions/question-card";

interface SubjectQuestionsPageProps {
  params: {
    type: string
    id: string
    subjectId: string
  }
  searchParams: {
    difficulty?: string
    page?: string
  }
}

export default function SubjectQuestionsPage({ params, searchParams }: SubjectQuestionsPageProps) {
  const { type, id, subjectId } = params
  const difficulty = searchParams.difficulty || "easy"
  const page = Number.parseInt(searchParams.page || "1")

  // Validate type
  if (type !== "class" && type !== "stream") {
    notFound()
  }

  const categoryTitle = type === "class" ? `Class ${id}` : capitalizeFirstLetter(id)
  const subjectName = getSubjectName(subjectId)

  // Get questions based on subject and difficulty
  const { questions, totalPages } = getQuestions(subjectId, difficulty, page)

  return (
    <Box className="container mx-auto p-4 md:p-6">
      <Box mb={6}>
        <Box display="flex" alignItems="center" gap={2} fontSize="0.875rem" color="text.secondary" mb={2}>
          <Link href="/preparation">Preparation</Link>
          <ChevronRight style={{ height: 16, width: 16 }} />
          <Link href={`/preparation/${type}/${id}`}>{categoryTitle}</Link>
          <ChevronRight style={{ height: 16, width: 16 }} />
          <span>{subjectName}</span>
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {subjectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">Practice questions by difficulty level</Typography>
      </Box>

      <Tabs
        value={difficulty}
        onChange={(_, value) => {
          // In a real app, this would use a router to change the URL
          window.location.href = `?difficulty=${value}`
        }}
        aria-label="Difficulty tabs"
        sx={{ marginTop: 2 }}
      >
        <Tab label="Easy" value="easy" />
        <Tab label="Medium" value="medium" />
        <Tab label="Hard" value="hard" />
      </Tabs>

      <Box sx={{ marginTop: 2 }}>
        {questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} number={index + 1 + (page - 1) * 10} />
        ))}

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => {
              window.location.href = `?difficulty=${difficulty}&page=${newPage}`
            }}
            color="primary"
            shape="rounded"
            siblingCount={1}
          />
        </Box>
      </Box>
    </Box>
  )
}

function getSubjectName(subjectId: string) {
  const subjects: Record<string, string> = {
    mathematics: "Mathematics",
    science: "Science",
    english: "English",
    "social-studies": "Social Studies",
    "computer-science": "Computer Science",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    economics: "Economics",
    "business-studies": "Business Studies",
    accountancy: "Accountancy",
  }

  return subjects[subjectId] || capitalizeFirstLetter(subjectId)
}

function getQuestions(subjectId: string, difficulty: string, page: number) {
  // This would come from an API in a real application
  const questionsPerPage = 10
  const allQuestions = generateQuestions(subjectId, difficulty)
  const startIndex = (page - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage

  return {
    questions: allQuestions.slice(startIndex, endIndex),
    totalPages: Math.ceil(allQuestions.length / questionsPerPage),
  }
}

function generateQuestions(subjectId: string, difficulty: string) {
  // Generate dummy questions
  return Array.from({ length: 30 }, (_, i) => ({
    id: `q-${subjectId}-${difficulty}-${i + 1}`,
    text: `Sample ${capitalizeFirstLetter(subjectId)} question #${i + 1} (${difficulty} difficulty)`,
    options: [
      { id: "a", text: "Option A" },
      { id: "b", text: "Option B" },
      { id: "c", text: "Option C" },
      { id: "d", text: "Option D" },
    ],
    correctAnswer: "a",
  }))
}

function capitalizeFirstLetter(string: string) {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
