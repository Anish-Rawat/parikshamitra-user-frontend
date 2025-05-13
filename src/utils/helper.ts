import { getClasses } from "@/redux/slices/classSlice";
import { getQuestions } from "@/redux/slices/questionSlice";
import { getSubjects } from "@/redux/slices/subjectSlice";
import { AppDispatch } from "@/redux/store";

export const getClassesMiddleware = async (
  dispatch: AppDispatch,
  accessToken: string
) => {
  try {
    await dispatch(getClasses({ accessToken }));
  } catch (error) {
    console.error("Error fetching classes:", error); // ✅ Correct variable name
  }
};

export const filteredSubjects = async (
  dispatch: AppDispatch,
  accessToken: string,
  classId?: string,
  page?: number,
  limit?: number
) => {
  try {
    await dispatch(
      getSubjects({
        accessToken: accessToken,
        classId: classId,
        page: page,
        limit: limit,
      })
    );
  } catch (err) {
    console.error("Error fetching subjects:", err);
  }
};

export const fetchQuestions = async (
  dispatch: AppDispatch,
  accessToken: string,
  classId: string,
  subjectId: string,
  difficultyLevel: string,
  searchQuestion: string,
  page: number,
  limit: number
) => {
  try {
    let difficulty = "";
    if (difficultyLevel.toLowerCase().trim() === "easy" || "medium" || "hard") {
      difficulty = difficultyLevel;
    }
    await dispatch(
      getQuestions({
        accessToken,
        classId,
        subjectId,
        difficultyLevel: difficulty,
        searchQuestion,
        page,
        limit,
      })
    );
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
};
