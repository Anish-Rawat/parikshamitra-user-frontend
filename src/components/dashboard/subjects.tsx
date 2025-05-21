import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getSubjects } from "@/redux/slices/subjects/subjectSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { toast } from "react-toastify";
import { setFormData as setTestFormData } from "@/redux/slices/test/test.slice";

const LIMIT = 10;

const SelectSubjects = () => {
  const dispatch = useAppDispatch();
  const accessTokenSelector = useAppSelector(
    (state: RootState) => state.auth.tokens.accessToken
  );
  const testFormSelector = useAppSelector(
    (state: RootState) => state.test.testForm
  );
  const subjectsSelector = useAppSelector((state: RootState) => state.subject);
  const subjects = subjectsSelector.data;

  const getSubjectsByClassAndStreamId = async () => {
    if (!accessTokenSelector) return;
    try {
      await dispatch(
        getSubjects({
          accessToken: accessTokenSelector,
          classId: testFormSelector.class,
          page: 1,
          limit: LIMIT,
        })
      );
    } catch (error) {
      toast.error("Error fetching subjects");
      console.error("Error fetching subjects:", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setTestFormData({ ...testFormSelector, [e.target.name]: e.target.value })
    );
  };

  React.useEffect(() => {
    getSubjectsByClassAndStreamId();
  }, [accessTokenSelector, testFormSelector.class]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
      <select
        name="subject"
        required
        disabled={subjectsSelector.loading || !testFormSelector.class}
        value={testFormSelector.subject}
        onChange={handleFormChange}
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          !testFormSelector.class ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        <option value="">Select Subject</option>
        {subjects.map((subj) => (
          <option key={subj.subjectId} value={subj.subjectId}>
            {subj.subjectName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSubjects;
