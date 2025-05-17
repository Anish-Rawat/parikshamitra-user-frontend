import React from "react";
import { DIFFICULTIES as difficulties } from "@/utils/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";

const SelectDifficulty = () => {
  const dispatch = useAppDispatch();
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  )

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value }));
  };

  return (
    <select
      name="difficulty"
      required
      value={testFormSelector.difficulty}
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
  );
};

export default SelectDifficulty;
