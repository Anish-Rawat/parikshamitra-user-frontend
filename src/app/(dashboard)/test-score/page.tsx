"use client";

import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const TestScore = () => {
    const router = useRouter();
  const testSelector = useAppSelector(
    (state: RootState) => state.test
  );
  const totalScore = testSelector?.submitTest?.data?.totalScore ?? 0;
  const totalQuestions = testSelector?.createTest?.data?.totalQuestions ?? 0;
  const correctAnswerCount =
  testSelector?.submitTest?.data?.evaluatedAnswers.filter(
    (item) => item.isCorrect
  ).length;
  const incorrectAnswerCount =
  testSelector?.submitTest?.data?.evaluatedAnswers.filter(
    (item) => !item.isCorrect
  ).length;
  const attemptedQuestionCount = testSelector?.submitTest?.data?.evaluatedAnswers.length;
  const handleStartNewTest = () => {
    router.push("/start-test");
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl text-center">
      <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
      <h2 className="text-5xl text-purple-600 font-bold mb-4">
        {/* {Math.floor((calculateResult() / 20) * 100)}% */}
        {totalScore}
      </h2>
      <p className="mb-4">
        You scored {totalScore} out of 20 questions
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-bold">Total Questions</h4>
          <p>{totalQuestions}</p>
        </div>
        <div>
          <h4 className="font-bold">Attempted</h4>
          <p>{attemptedQuestionCount}</p>
        </div>
        <div>
          <h4 className="font-bold">Correct</h4>
          <p>{correctAnswerCount}</p>
        </div>
        <div>
          <h4 className="font-bold">Incorrect</h4>
          <p>{incorrectAnswerCount}</p>
        </div>
      </div>
      <button
        className="bg-purple-600 text-white px-6 py-3 rounded"
        onClick={() => {
            handleStartNewTest();
        //   setFormData({
        //     category: "",
        //     class: "",
        //     subject: "",
        //     difficulty: "",
        //     numberOfQuestions: "",
        //   });
        // setCurrentQuestion(0);
        }}
      >
        Start New Test
      </button>
    </div>
  );
};

export default TestScore;
