"use client";

import Subjects from "@/components/dashboard/subjects";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getQuestions } from "@/redux/slices/questionSlice";
import {
  createTest,
  setFormData as setTestFormData,
} from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import React from "react";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const questionsSelector = useAppSelector(
    (state: RootState) => state.question
  );

  const validateForm = () => {
    if (
      [
        testFormSelector.category,
        testFormSelector.class,
        testFormSelector.subject,
        testFormSelector.difficulty,
        testFormSelector.numberOfQuestions,
      ].includes("")
    ) {
      return false;
    }
    return true;
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
    validateForm();
    try {
      await dispatch(
        createTest({
          accessToken: accessTokenSelector ?? "",
          testName: testFormSelector.testName ?? "",
          difficultyLevel: testFormSelector.difficulty.toLocaleLowerCase(),
          totalQuestions: Number(testFormSelector.numberOfQuestions),
          subjectId: testFormSelector.subject,
          classId: testFormSelector.class,
        })
      );
      const questions = await dispatch(
        getQuestions({
          accessToken: accessTokenSelector ?? "",
          classId: testFormSelector.class,
          subjectId: testFormSelector.subject,
          difficultyLevel: testFormSelector.difficulty,
          page: 1,
          limit: Number(testFormSelector.numberOfQuestions),
          searchQuestion: "",
        })
      ).unwrap();
      const totalQuestions = questions.data.result.length;
      if (totalQuestions === 0) {
        toast.error("No questions found");
        return;
      }
      const questionId = questions.data.result[0]._id;
      router.push(`/question/${questionId}`);
    } catch (error) {
      toast.error("Error creating test");
      console.error("Error creating test:", error);
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Start Test</h1>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => startTest(e)}>
          <input
            type="string"
            name="testName"
            required
            value={testFormSelector.testName}
            onChange={(e) => handleFormInputChange(e)}
            placeholder="Enter Test Name"
            className="p-3 border rounded"
          />
          <SelectCategory />
          <SelectClassesAndStreams />

          <Subjects />

          <SelectDifficulty />

          <input
            type="number"
            required
            name="numberOfQuestions"
            value={testFormSelector.numberOfQuestions}
            onChange={(e) => handleFormInputChange(e)}
            placeholder="Enter number of questions"
            className="p-3 border rounded"
          />
          <button
            className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 cursor-pointer"
            type="submit"
          >
            Start Test
          </button>
        </form>
      </div>
    </div>
  );
}
