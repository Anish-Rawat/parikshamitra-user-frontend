import { useState } from "react"
import { Card, CardContent, CardActions, CardHeader, Typography, Radio, FormControlLabel, RadioGroup, Button, FormControl } from "@mui/material"
import { CheckCircle, Cancel } from "@mui/icons-material"

interface Question {
  id: string
  text: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
}

interface QuestionCardProps {
  question: Question
  number: number
}

export function QuestionCard({ question, number }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isCorrect = selectedOption === question.correctAnswer

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-900">
              {number}
            </div>
            <Typography variant="h6">{question.text}</Typography>
          </div>

          {isSubmitted && (
            <div className="flex items-center gap-1 text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Typography className="font-medium text-green-500">Correct</Typography>
                </>
              ) : (
                <>
                  <Cancel className="h-5 w-5 text-red-500" />
                  <Typography className="font-medium text-red-500">Incorrect</Typography>
                </>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <FormControl disabled={isSubmitted}>
          <RadioGroup value={selectedOption || ""} onChange={(e) => setSelectedOption(e.target.value)}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={option.text}
                disabled={isSubmitted}
                style={{
                  border: isSubmitted && option.id === question.correctAnswer
                    ? "2px solid green"
                    : isSubmitted && option.id === selectedOption
                      ? "2px solid red"
                      : "",
                  backgroundColor: isSubmitted && option.id === question.correctAnswer
                    ? "#d4f7d4"
                    : isSubmitted && option.id === selectedOption
                      ? "#fddddd"
                      : "",
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>

      <CardActions>
        {isSubmitted ? (
          <Button onClick={handleReset} variant="outlined">
            Try Again
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" disabled={!selectedOption}>
            Submit Answer
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
