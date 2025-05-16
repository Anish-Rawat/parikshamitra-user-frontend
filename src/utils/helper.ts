import { getClasses } from "@/redux/slices/class/classSlice";
import { getQuestions } from "@/redux/slices/question/questionSlice";
import { getSubjects } from "@/redux/slices/subjects/subjectSlice";
import { AppDispatch } from "@/redux/store";
import { signIn } from "next-auth/react";

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
        page,
        limit,
      })
    );
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
};


export const socialLogin = async (provider: string) => {
  try {
    await signIn(provider, {callbackUrl: '/dashboard'});
  } catch (err) {
    console.error("Error logging in:", err);
  }
};