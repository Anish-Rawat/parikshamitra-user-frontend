"use client";

import useTimer from "@/hooks/useTimer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAnswers } from "@/redux/slices/test/answer.slice";
import { submitTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TOTAL_TIMER = 30;
const optionLetters = ["A", "B", "C", "D"];


const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const timer = useTimer({ totalTimer: TOTAL_TIMER });
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const questionsSelector = useAppSelector(
    (state: RootState) => state.question
  );
  const testAnswersSelector = useAppSelector(
    (state: RootState) => state.answer
  );
  const testSelector = useAppSelector(
    (state: RootState) => state.test.createTest
  );
  const questions = questionsSelector.data;

  const handleAnswer = (questionId: string | undefined, answer: string) => {
    if (!questionId) return;

    dispatch(setAnswers({ questionId, answer }));
  };


  const handleSubmitTest = async () => {
    if (
      !accessTokenSelector ||
      testSelector.loading ||
      questionsSelector.loading
    ) {
      return;
    }
    try {
      const testId = testSelector.data._id;
      await dispatch(
        submitTest({
          accessToken: accessTokenSelector ?? "",
          testId,
          answers: testAnswersSelector,
        })
      );
    } catch (error) {
      console.error(error);
      toast.error("Error submitting test");
    }
    router.push("/test-score");
  };

  useEffect(() => {
    if (timer === 0 && currentQuestion < questions.length - 1) {
      handleNextQuestion();
    }
    if (timer === 0 && currentQuestion === questions.length - 1) {
      handleSubmitTest();
    }
  }, [timer]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    router.push(`/question/${questions[currentQuestion + 1]?.questionId}`);
  };

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
                handleAnswer(
                  questions[currentQuestion].questionId,
                  optionLetters[idx]
                )
              }
              className={`border rounded p-3 text-left cursor-pointer ${
                testAnswersSelector[currentQuestion]?.answer ===
                optionLetters[idx]
                  ? "bg-purple-100 border-purple-500"
                  : "bg-white"
              }`}
            >
              <span className="font-semibold mr-2">{optionLetters[idx]}.</span>{" "}
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
            onClick={handleSubmitTest}
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

export default Questions;
