import { SelectTestInfoProps } from "@/common/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getClasses } from "@/redux/slices/classSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { toast } from "react-toastify";

const SelectClassesAndStreams: React.FC<SelectTestInfoProps> = ({
  setFormData,
  formData,
}) => {
  const dispatch = useAppDispatch();

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

  const [selectedClass, setSelectedClass] = React.useState(classes[0]?.classId);

  const getAllClassesAndStreams = async () => {
    if (!accessTokenSelector) {
      return;
    }
    try {
      await dispatch(getClasses({ accessToken: accessTokenSelector ?? "" }));
    } catch (error) {
      toast.error("Error fetching classes");
      console.error("Error fetching classes:", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSelectedClass(e.target.value);
  };

  React.useEffect(() => {
    getAllClassesAndStreams();
  }, [accessTokenSelector]);

  return (
    <select
      disabled={!formData.category}
      name="class"
      required
      value={selectedClass}
      onChange={handleFormChange}
      className="p-3 border rounded"
    >
      <option value="">Select {formData.category}</option>
      {formData.category === "Stream" &&
        streams.map((cls) => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
      {formData.category === "Class" &&
        classes.map((cls) => (
          <option key={cls.classId} value={cls.classId}>
            {cls.className}
          </option>
        ))}
    </select>
  );
};

export default SelectClassesAndStreams;
