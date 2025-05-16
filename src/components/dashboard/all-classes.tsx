import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getClasses } from "@/redux/slices/class/classSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { toast } from "react-toastify";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";

const SelectClassesAndStreams = () => {
  const dispatch = useAppDispatch();
    const testFormSelector = useAppSelector(
      (state: RootState) => state.test.testForm
    );

  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );

  const classesAndStreamSelector = useAppSelector(
    (state: RootState) => state.class
  );

  const streams = classesAndStreamSelector.data.filter(
    (item) => item.category === "stream"
  );

  const classes = classesAndStreamSelector.data.filter(
    (item) => item.category === "class"
  );

  const getAllClassesAndStreams = async () => {
    if (!accessTokenSelector) return;
    try {
      await dispatch(getClasses({ accessToken: accessTokenSelector }));
    } catch (error) {
      toast.error("Error fetching classes");
      console.error("Error fetching classes:", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    getAllClassesAndStreams();
  }, [accessTokenSelector]);

  return (
    <select
      disabled={!testFormSelector.category}
      name="class"
      required
      value={testFormSelector.class}
      onChange={handleFormChange}
      className="p-3 border rounded"
    >
      <option value="">Select {testFormSelector.category}</option>
      {testFormSelector.category === "Stream" &&
        streams.map((cls) => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
      {testFormSelector.category === "Class" &&
        classes.map((cls) => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
    </select>
  );
};

export default SelectClassesAndStreams;
