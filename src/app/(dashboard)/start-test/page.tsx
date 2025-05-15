"use client";

import ClassesAndStreams from "@/components/dashboard/all-classes";
import Subjects from "@/components/dashboard/subjects";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getQuestions } from "@/redux/slices/questionSlice";
import { createTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import {
  CATEGORIES as categories,
  DIFFICULITES as difficulties,
} from "@/utils/mockData";
import { useRouter } from "next/navigation";

export default function CreateTestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    class: "",
    subject: "",
    difficulty: "",
    numberOfQuestions: "",
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
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const startTest = async () => {
    if (
      !accessTokenSelector ||
      testSelector.loading ||
      questionsSelector.loading
    ) {
      return;
    }

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
    await dispatch(
      getQuestions({
        accessToken: accessTokenSelector ?? "",
        classId: formData.class,
        subjectId: formData.subject,
        difficultyLevel: formData.difficulty,
        page: 1,
        limit: Number(formData.numberOfQuestions),
        searchQuestion: "",
      })
    );
    // setStep(2);
    router.push(`/question/${questionsSelector.data[0].questionId}`);
  };

  const handleNumberOfQuestions = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Start Test</h1>
          <div className="grid grid-cols-1 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              className="p-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formData.category && (
              <ClassesAndStreams
                type={formData.category}
                setFormData={setFormData}
                formData={formData}
              />
            )}

            {formData.class && (
              <Subjects setFormData={setFormData} formData={formData} />
            )}

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleFormChange}
              className="p-3 border rounded"
            >
              <option value="">Select Difficulty</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleNumberOfQuestions}
              placeholder="Enter number of questions"
              className="p-3 border rounded"
            />
            <button
              className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
              onClick={startTest}
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
          {/* <h2 className="text-5xl text-purple-600 font-bold mb-4">
            {Math.floor((calculateResult() / 20) * 100)}%
          </h2> */}
          {/* <p className="mb-4">
            You scored {calculateResult()} out of 20 questions
          </p> */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-bold">Total Questions</h4>
              <p>20</p>
            </div>
            <div>
              <h4 className="font-bold">Attempted</h4>
            </div>
            <div>
              <h4 className="font-bold">Correct</h4>
              {/* <p>{calculateResult()}</p> */}
            </div>
            <div>
              <h4 className="font-bold">Incorrect</h4>
            </div>
          </div>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded"
            onClick={() => {
              setFormData({
                category: "",
                class: "",
                subject: "",
                difficulty: "",
                numberOfQuestions: "",
              });
              // setCurrentQuestion(0);
              setStep(1);
            }}
          >
            Start New Test
          </button>
        </div>
      )}
    </div>
  );
}
