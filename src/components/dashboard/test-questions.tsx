import useTimer from "@/hooks/useTimer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAnswers } from "@/redux/slices/test/answer.slice";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";

const TOTAL_TIMER = 10;

const TestQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const dispatch = useAppDispatch();
  const timer = useTimer({ totalTimer: TOTAL_TIMER });

  const questionsSelector = useAppSelector(
    (state: RootState) => state.question
  );
  console.log("questionsSelector", questionsSelector);
  const testAnswersSelector = useAppSelector(
    (state: RootState) => state.answer
  );
  const questions = questionsSelector.data;

  const handleAnswer = (questionId: string | undefined, answer: string) => {
    if (!questionId) return;
    dispatch(setAnswers({ questionId, answer }));
  };

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) =>
        Math.min(prev + 1, questions.length - 1)
      );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-2xl font-semibold">{formData.subject} Test</h2> */}
        <span>{timer}:00</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {questions[currentQuestion]?.question}
        </h3>
        <div className="flex flex-col gap-3">
          {questions[currentQuestion].options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() =>
                handleAnswer(questions[currentQuestion].questionId, opt)
              }
              className={`border rounded p-3 text-left cursor-pointer ${
                testAnswersSelector[currentQuestion]?.answer === opt
                  ? "bg-purple-100 border-purple-500"
                  : "bg-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
          className={`${currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer bg-purple-600 text-white"} px-4 py-2 rounded`}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button
            // onClick={handleSubmitTest}
            className={`bg-purple-600 text-white px-4 py-2 rounded`}
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className={`${currentQuestion === questions.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} bg-purple-600 text-white px-4 py-2 rounded`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TestQuestions;
