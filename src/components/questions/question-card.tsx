"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  FormControl,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { QuestionInterface } from "@/common/interface";

interface QuestionCardProps {
  question: QuestionInterface;
  number: number;
}

export function QuestionCard({ question, number }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect,setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selectedOption) {
      const selectedIndex = question?.options?.indexOf(selectedOption);
      console.log("selectedIndex",selectedIndex)
      const selectedLetter = ["A", "B", "C", "D"][selectedIndex];
      console.log("selectedLetter",selectedLetter)
      setIsCorrect(selectedLetter === question.correctAnswer);
      setIsSubmitted(true);
    }
  };
  

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };
  // console.log("question is : ", question);
  // console.log("selectedOption is : ", selectedOption);
  // console.log("isSubmitted: ", isSubmitted);
  // console.log("question?.correctAnswer: ", question?.correctAnswer);
  console.log("isCorrect: ", isCorrect);

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-900">
              {number}
            </div>
            <Typography variant="h6">{question?.question}</Typography>
          </div>
        }
        action={
          isSubmitted && (
            <div className="flex items-center gap-1 text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Typography className="font-medium text-green-500">
                    Correct
                  </Typography>
                </>
              ) : (
                <>
                  <Cancel className="h-5 w-5 text-red-500" />
                  <Typography className="font-medium text-red-500">
                    Incorrect
                  </Typography>
                </>
              )}
            </div>
          )
        }
      />

      <CardContent>
        <FormControl disabled={isSubmitted}>
          <RadioGroup
            value={selectedOption || ""}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {question?.options?.map((option, index) => {
              const optionLetter = ["A", "B", "C", "D"][index];
              const isCorrectAnswer =
                isSubmitted && optionLetter === question.correctAnswer;
              const isWrongSelected =
                isSubmitted && selectedOption === option && !isCorrectAnswer;

              return (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isSubmitted}
                  style={{
                    border: isCorrectAnswer
                      ? "2px solid green"
                      : isWrongSelected
                      ? "2px solid red"
                      : "",
                    backgroundColor: isCorrectAnswer
                      ? "#d4f7d4"
                      : isWrongSelected
                      ? "#fddddd"
                      : "",
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>

      <CardActions>
        {isSubmitted ? (
          <Button onClick={handleReset} variant="outlined">
            Try Again
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedOption}
          >
            Submit Answer
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
