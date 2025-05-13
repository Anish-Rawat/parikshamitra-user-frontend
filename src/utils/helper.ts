import { getQuestions } from "@/redux/slices/questionSlice";
import { getSubjects } from "@/redux/slices/subjectSlice";
import { AppDispatch } from "@/redux/store";

export const filteredSubjects = async (
    dispatch: AppDispatch,
    accessToken: string,
    classId?:string,
    page?:number,
    limit?:number,
) => {
    try {
      await dispatch(
        getSubjects({ accessToken: accessToken ,classId:classId,page:page,limit:limit})
      );
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  export const fetchQuestions= async (
    dispatch: AppDispatch,
    accessToken: string,
    classId:string,
    subjectId:string,
    difficultyLevel:string,
    searchQuestion:string,
    page:number,
    limit:number
  ) => {
    try {
      let difficulty="";
      if(difficultyLevel.toLowerCase().trim() === "easy" || "medium" || "hard"){
        difficulty = difficultyLevel
      }
      await dispatch(getQuestions({ accessToken ,classId,subjectId,difficultyLevel:difficulty,searchQuestion,page,limit}));
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };