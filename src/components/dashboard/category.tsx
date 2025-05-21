import { CATEGORIES as categories } from "@/utils/mockData";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";
import { RootState } from "@/redux/store";

const SelectCategory = () => {
  const dispatch = useAppDispatch();
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <select
        name="category"
        required
        value={testFormSelector.category}
        onChange={handleFormChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
