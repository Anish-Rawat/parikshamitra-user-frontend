"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  CardHeader, 
  Typography, 
  LinearProgress, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Alert 
} from "@mui/material";

import { Clock, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "class";
  const id = searchParams.get("id") || "";
  const subject = searchParams.get("subject") || "";
  const difficulty = searchParams.get("difficulty") || "mixed";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = generateQuestions(subject, difficulty);

  useEffect(() => {
    if (!isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSubmitted]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
  };

  const handleViewResults = () => {
    router.push("/test/results");
  };

  const score = isSubmitted
    ? Object.entries(answers).reduce((acc, [questionIndex, answer]) => {
        const question = questions[Number.parseInt(questionIndex)];
        return acc + (answer === question.correctAnswer ? 1 : 0);
      }, 0)
    : 0;

  const scorePercentage = Math.round((score / questions.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box className="container mx-auto p-4 md:p-6">
      {isSubmitted ? (
        <Box maxWidth="600px" mx="auto">
          <Card>
            <CardHeader title={<Typography variant="h5" align="center">Test Completed!</Typography>} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h2" color="primary" fontWeight="bold">
                {scorePercentage}%
              </Typography>
              <Typography color="textSecondary" mb={3}>
                You scored {score} out of {questions.length} questions
              </Typography>

              <LinearProgress variant="determinate" value={scorePercentage} sx={{ height: 10, mb: 4 }} />

              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {[
                  { label: "Total Questions", value: questions.length },
                  { label: "Attempted", value: Object.keys(answers).length },
                  { label: "Correct", value: score },
                  { label: "Incorrect", value: Object.keys(answers).length - score },
                ].map((item) => (
                  <Box key={item.label} p={2} border="1px solid #ccc" borderRadius={2} textAlign="center">
                    <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
                    <Typography variant="caption" color="textSecondary">{item.label}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="contained" onClick={handleViewResults}>
                View Detailed Results
              </Button>
            </CardActions>
          </Card>
        </Box>
      ) : (
        <Box maxWidth="600px" mx="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h5" fontWeight="bold">{getSubjectName(subject)} Test</Typography>
              <Typography color="textSecondary">
                {difficulty === "mixed" ? "Mixed difficulty" : `${capitalizeFirstLetter(difficulty)} difficulty`}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Clock size={20} />
              <Typography color={timeLeft < 300 ? "error" : "textPrimary"}>{formatTime(timeLeft)}</Typography>
            </Box>
          </Box>

          <Box mb={4}>
            <LinearProgress variant="determinate" value={((currentQuestion + 1) / questions.length) * 100} sx={{ height: 8 }} />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption">
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
              <Typography variant="caption">
                {Object.keys(answers).length} answered
              </Typography>
            </Box>
          </Box>

          <Card>
            <CardHeader title={questions[currentQuestion].text} />
            <CardContent>
              <RadioGroup value={answers[currentQuestion] || ""} onChange={(e) => handleAnswer(e.target.value)}>
                {questions[currentQuestion].options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                startIcon={<ArrowLeft size={16} />}
              >
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmitTest}
                  startIcon={<CheckCircle size={16} />}
                >
                  Submit Test
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowRight size={16} />}
                >
                  Next
                </Button>
              )}
            </CardActions>
          </Card>

          {timeLeft < 300 && (
            <Alert severity="error" sx={{ mt: 4 }}>
              <Typography variant="h6">Time is running out!</Typography>
              <Typography>You have less than 5 minutes remaining to complete the test.</Typography>
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}

// Helper functions
function generateQuestions(subject: string, difficulty: string) {
  const count = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;

  return Array.from({ length: count }, (_, i) => ({
    id: `q-${subject}-${difficulty}-${i + 1}`,
    text: `Sample ${getSubjectName(subject)} question #${i + 1} (${difficulty} difficulty)`,
    options: [
      { id: "a", text: "Option A" },
      { id: "b", text: "Option B" },
      { id: "c", text: "Option C" },
      { id: "d", text: "Option D" },
    ],
    correctAnswer: ["a", "b", "c", "d"][Math.floor(Math.random() * 4)],
  }));
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
  };
  return subjects[subjectId] || capitalizeFirstLetter(subjectId);
}

function capitalizeFirstLetter(string: string) {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
