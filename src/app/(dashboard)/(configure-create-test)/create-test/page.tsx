"use client";

import TestForm from "@/components/common/test-form";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const CreateTestPage: React.FC = () => {
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );

  const router = useRouter();

  const validateForm = () => {
    if (
      testFormSelector.testName &&
      testFormSelector.category &&
      testFormSelector.class &&
      testFormSelector.subject &&
      testFormSelector.difficulty
    ) {
      return true;
    }
    return false;
  };

  const handleSelectQuestions = () => {
    validateForm();
    router.push("/select-questions");
  };

  const handleConfigFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSelectQuestions();
  };

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={(e) => handleConfigFormSubmit(e)}
    >
      <TestForm />

      <button
        type="submit"
        className="mt-4 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
      >
        Continue to Select Questions
      </button>
    </form>
  );
};

export default CreateTestPage;
