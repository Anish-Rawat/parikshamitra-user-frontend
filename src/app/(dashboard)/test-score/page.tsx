"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/redux/hook";
import { resetAnswers } from "@/redux/slices/test/answer.slice";
import { resetTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const TestScore = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const testSelector = useAppSelector((state: RootState) => state.test);
  const totalScore = testSelector?.submitTest?.data?.totalScore ?? 0;
  const totalQuestions = testSelector?.createTest?.data?.totalQuestions ?? 0;
  const evaluatedAnswers =
    testSelector?.submitTest?.data?.evaluatedAnswers ?? [];

  const correctAnswerCount = evaluatedAnswers.filter(
    (item) => item.isCorrect
  ).length;
  const attemptedQuestionCount = evaluatedAnswers.filter(
    (item) => item.submittedAnswer
  ).length;
  const incorrectAnswerCount = attemptedQuestionCount - correctAnswerCount;
  const percentage = Math.floor((totalScore / totalQuestions) * 100) || 0;

  const handleStartNewTest = () => {
    dispatch(resetAnswers());
    dispatch(resetTest());
    router.push("/start-test");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          🎉 Test Completed!
        </h1>

        <div className="mb-6">
          <div className="text-7xl font-bold text-indigo-600 drop-shadow">
            {percentage}%
          </div>
          <p className="text-gray-600 mt-2">
            You scored{" "}
            <span className="font-semibold text-indigo-700">{totalScore}</span>{" "}
            out of{" "}
            <span className="font-semibold text-indigo-700">
              {totalQuestions}
            </span>{" "}
            questions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="bg-white border rounded-xl p-4 shadow">
            <p className="text-gray-500 font-medium">Total</p>
            <p className="text-lg font-bold text-gray-800">{totalQuestions}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow">
            <p className="text-blue-600 font-medium">Attempted</p>
            <p className="text-lg font-bold text-blue-700">
              {attemptedQuestionCount}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow">
            <p className="text-green-600 font-medium">Correct</p>
            <p className="text-lg font-bold text-green-700">
              {correctAnswerCount}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow">
            <p className="text-red-600 font-medium">Incorrect</p>
            <p className="text-lg font-bold text-red-700">
              {incorrectAnswerCount}
            </p>
          </div>
        </div>

        <button
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow transition"
          onClick={handleStartNewTest}
        >
          🔁 Start New Test
        </button>
      </div>
    </div>
  );
};

export default TestScore;
