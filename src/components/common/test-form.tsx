import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/redux/store";
import React from "react";
import SelectCategory from "../dashboard/category";
import SelectClassesAndStreams from "../dashboard/all-classes";
import Subjects from "@/components/dashboard/subjects";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";
import SelectDifficulty from "../dashboard/difficulty";

const TestForm = () => {
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );
  const dispatch = useAppDispatch();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value })
    );
  };

  return (
    <>
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
    </>
  );
};

export default TestForm;
