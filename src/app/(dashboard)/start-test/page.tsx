"use client";

import Subjects from "@/components/dashboard/subjects";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getQuestions } from "@/redux/slices/questionSlice";
import { createTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SelectClassesAndStreams from "@/components/dashboard/all-classes";
import SelectCategory from "@/components/dashboard/category";
import SelectDifficulty from "@/components/dashboard/difficulty";
import { toast } from "react-toastify";

export default function CreateTestPage() {
  const [formData, setFormData] = useState({
    category: "",
    class: "",
    subject: "",
    difficulty: "",
    numberOfQuestions: "",
    testName: "",
  });
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
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
        formData.category,
        formData.class,
        formData.subject,
        formData.difficulty,
        formData.numberOfQuestions,
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
          testName: formData.subject ?? "abcdef",
          difficultyLevel: formData.difficulty.toLocaleLowerCase(),
          totalQuestions: Number(formData.numberOfQuestions),
          subjectId: formData.subject,
          classId: formData.class,
        })
      );
      const questions = await dispatch(
        getQuestions({
          accessToken: accessTokenSelector ?? "",
          classId: formData.class,
          subjectId: formData.subject,
          difficultyLevel: formData.difficulty,
          page: 1,
          limit: Number(formData.numberOfQuestions),
          searchQuestion: "",
        })
      ).unwrap();
      if (questions.data.result.length === 0) {
        toast.error("No questions found");
        return;
      }
      const questionId = questions.data.result[0]._id;
      router.push(`/question/${questionId}`);
    }
    catch (error) {
      toast.error("Error creating test");
      console.error("Error creating test:", error);
    }
  };

    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
            value={formData.testName}
            onChange={(e) => handleFormInputChange(e)}
            placeholder="Enter Test Name"
            className="p-3 border rounded"
          />
          <SelectCategory setFormData={setFormData} formData={formData} />
          <SelectClassesAndStreams
            setFormData={setFormData}
            formData={formData}
          />

          <Subjects setFormData={setFormData} formData={formData} />
          <SelectDifficulty setFormData={setFormData} formData={formData} />

          <input
            type="number"
            required
            name="numberOfQuestions"
            value={formData.numberOfQuestions}
            onChange={(e) => handleFormInputChange(e)}
            placeholder="Enter number of questions"
            className="p-3 border rounded"
          />
          <button
            className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
            type="submit"
          >
            Start Test
          </button>
        </form>
      </div>
    </div>
  );
}
