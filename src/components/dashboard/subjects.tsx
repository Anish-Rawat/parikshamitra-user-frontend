import { FormDataType } from "@/common/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getSubjects } from "@/redux/slices/subjectSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { toast } from "react-toastify";


const LIMIT = 10;

interface SubjectsProps {
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    formData: FormDataType;
}

const Subjects:React.FC<SubjectsProps> = ({setFormData, formData}) => {
  const dispatch = useAppDispatch();
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );

  const subjectsSelector = useAppSelector(
    (state: RootState) => state.subject
  );

  const subjects = subjectsSelector.data;

  const getSubjectsByClassAndStreamId = async () => {
    if (!accessTokenSelector) {
      return;
    }
    try {
      await dispatch(getSubjects({ accessToken: accessTokenSelector ?? "", classId: formData.class, page: 1, limit: LIMIT }));
    } catch (error) {
      toast.error("Error fetching classes");
      console.error("Error fetching classes:", error);
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    getSubjectsByClassAndStreamId();
  }, [accessTokenSelector, formData.class]);

  

  return (
    <select
      name="subject"
      disabled={subjectsSelector.loading}
      value={formData.subject}
      onChange={handleFormChange}
      className="p-3 border rounded"
    >
      <option value="">Select Subject</option>
      {subjects.map((subj) => (
        <option key={subj.subjectId} value={subj.subjectId}>
          {subj.subjectName}
        </option>
      ))}
    </select>
  );
};

export default Subjects;
