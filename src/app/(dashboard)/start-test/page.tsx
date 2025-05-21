"use client";

import React from "react";
import Subjects from "@/components/dashboard/subjects";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getQuestions } from "@/redux/slices/question/questionSlice";
import {
  createTest,
  setFormData as setTestFormData,
} from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import SelectClassesAndStreams from "@/components/dashboard/all-classes";
import SelectCategory from "@/components/dashboard/category";
import SelectDifficulty from "@/components/dashboard/difficulty";
import { toast } from "react-toastify";

export default function CreateTestPage() {
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );
  const testSelector = useAppSelector((state: RootState) => state.test);
  const questionsSelector = useAppSelector(
    (state: RootState) => state.question
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = () => {
    return ![
      testFormSelector.category,
      testFormSelector.class,
      testFormSelector.subject,
      testFormSelector.difficulty,
      testFormSelector.numberOfQuestions,
    ].includes("");
  };

  const startTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !accessTokenSelector ||
      testSelector.createTest.loading ||
      questionsSelector.loading
    ) {
      return;
    }

    if (!validateForm()) {
      toast.warning("Please fill out all fields.");
      return;
    }

    try {
      await dispatch(
        createTest({
          accessToken: accessTokenSelector,
          testName: testFormSelector.testName ?? "",
          difficultyLevel: testFormSelector.difficulty.toLowerCase(),
          totalQuestions: Number(testFormSelector.numberOfQuestions),
          subjectId: testFormSelector.subject,
          classId: testFormSelector.class,
        })
      );

      const questions = await dispatch(
        getQuestions({
          accessToken: accessTokenSelector,
          classId: testFormSelector.class,
          subjectId: testFormSelector.subject,
          difficultyLevel: testFormSelector.difficulty,
          page: 1,
          limit: Number(testFormSelector.numberOfQuestions),
          searchQuestion: "",
        })
      ).unwrap();

      if (questions.data.result.length === 0) {
        toast.error("No questions found.");
        return;
      }

      const questionId = questions.data.result[0]._id;
      router.push(`/question/${questionId}`);
    } catch (error) {
      toast.error("Error creating test.");
      console.error("Test creation error:", error);
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Start a New Test</h1>
          <p className="text-sm text-gray-500">Fill in the details to begin your practice test</p>
        </div>

        <form onSubmit={startTest} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Name
            </label>
            <input
              type="text"
              name="testName"
              required
              value={testFormSelector.testName}
              onChange={handleFormInputChange}
              placeholder="Enter Test Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <SelectCategory />
          <SelectClassesAndStreams />
          <Subjects />
          <SelectDifficulty />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              required
              name="numberOfQuestions"
              value={testFormSelector.numberOfQuestions}
              onChange={handleFormInputChange}
              placeholder="Enter number of questions"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition duration-200"
          >
            Start Test
          </button>
        </form>
      </div>
    </div>
  );
}
