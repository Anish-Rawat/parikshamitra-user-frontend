import { SelectTestInfoProps } from "@/common/interface";
import React from "react";
import { DIFFICULITES as difficulties } from "@/utils/mockData";


const SelectDifficulty: React.FC<SelectTestInfoProps> = ({
  setFormData,
  formData,
}) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <select
      name="difficulty"
      required
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
  );
};

export default SelectDifficulty;
