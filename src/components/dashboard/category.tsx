import { CATEGORIES as categories } from "@/utils/constant";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";

const SelectCategory = () => {
  const dispatch = useAppDispatch();
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  )
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTestFormData({...testFormSelector, [e.target.name]: e.target.value}));
  };
  return (
    <select
      name="category"
      required
      value={testFormSelector.category}
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
  );
};

export default SelectCategory;
