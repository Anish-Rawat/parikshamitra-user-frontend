import { SelectTestInfoProps } from "@/common/interface";
import { CATEGORIES as categories } from "@/utils/mockData";
import React from "react";


const SelectCategory: React.FC<SelectTestInfoProps> = ({ setFormData, formData }) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <select
      name="category"
      required
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
  );
};

export default SelectCategory;
