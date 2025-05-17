"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetQuestions } from "@/redux/slices/question/questionSlice";
import { resetTest } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const PreviewTest = () => {
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateAnotherTest = () => {
    dispatch(resetTest());
    dispatch(resetQuestions());
    router.push("/create-test");
  }
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-2">
        Test Created Successfully!
      </h2>
      <p className="mb-4">
        Your test {testFormSelector.testName} has been created and is ready to
        share
      </p>
      <div className="flex items-center border rounded p-2 mb-4">
        <input
          type="text"
          value="https://your-app-link.com/shared-test/xyz123"
          readOnly
          className="flex-1 p-2"
        />
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              "https://your-app-link.com/shared-test/xyz123"
            )
          }
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
        >
          Copy
        </button>
      </div>
      <button
        onClick={handleCreateAnotherTest}
        className="bg-purple-500 text-white py-2 px-6 rounded hover:bg-purple-600"
      >
        Create Another Test
      </button>
    </div>
  );
};

export default PreviewTest;
