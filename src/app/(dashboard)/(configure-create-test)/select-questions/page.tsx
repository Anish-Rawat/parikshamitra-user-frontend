"use client";

import { QuestionInterface } from "@/common/interface";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectQuestions } from "@/redux/slices/question/questionSlice";
import { RootState } from "@/redux/store";
import { fetchQuestions } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SelectQuestions = () => {
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const router = useRouter();

  const questions = useAppSelector((state: RootState) => state.question.data);
  const dispatch = useAppDispatch();
  const selectedQuestions = useAppSelector(
    (state: RootState) => state.question.selectedQuestions
  );

  const handleSelectQuestion = (question: QuestionInterface) => {
    const { questionId: id } = question;
    if (!id) return;
    const questionIsExists = selectedQuestions.find((q) => q.questionId === id);
    if (questionIsExists) {
      const newSelectedQuestions = selectedQuestions.filter(
        (q) => q.questionId !== id
      );
      dispatch(selectQuestions(newSelectedQuestions));
    } else {
      const newSelectedQuestions = [...selectedQuestions, question];
      dispatch(selectQuestions(newSelectedQuestions));
    }
  };

  const getQuestions = async () => {
    const accessToken = accessTokenSelector;
    const classId = testFormSelector.class;
    const subjectId = testFormSelector.subject;
    const difficultyLevel = testFormSelector.difficulty;
    const page = 1;
    const limit = Number(testFormSelector.numberOfQuestions);
    try {
      fetchQuestions(
        dispatch,
        accessToken,
        classId,
        subjectId,
        difficultyLevel,
        page,
        limit
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (accessTokenSelector) {
      getQuestions();
    }
  }, [accessTokenSelector]);

  if (questions.length === 0) {
    return (
      <>
        <div>No questions available</div>
        <div className="flex justify-between mt-4 text-center">
          <button
            onClick={() => router.push("/create-test")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back to Configuration
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Select Questions</h2>

      <div className="h-64 overflow-y-auto border rounded p-2 space-y-2">
        {questions.map((q: QuestionInterface) => (
          <div key={q.questionId} className="border-b py-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQuestions.some(
                  (selected) => selected.questionId === q.questionId
                )}
                onChange={() => handleSelectQuestion(q)}
                className="mr-2"
              />
              <span>{q.question}</span>
            </div>
            <ul className="pl-6 text-sm mt-1 space-y-1">
              {q.options?.map((opt, idx) => (
                <li key={q.questionId}>
                  {String.fromCharCode(65 + idx)}. {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => router.push("/create-test")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back to Configuration
        </button>
        <button
          onClick={() => router.push("/preview-test")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Create Test
        </button>
      </div>
    </div>
  );
};

export default SelectQuestions;
