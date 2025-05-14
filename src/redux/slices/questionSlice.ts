import {
    ApiResponseQuestionInterface,
    QuestionInterface,
    QuestionState,
  } from "@/common/interface";
import { API_URIS } from "@/utils/contant";
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  
  const initialState: QuestionState = {
    data: [],
    totalQuestions:0,
    loading: false,
    error: null,
  };
  
  export const getQuestions = createAsyncThunk(
    "getQuestions",
    async ({
      accessToken,
      classId,
      subjectId,
      searchQuestion,
      difficultyLevel,
      limit,
      page,
    }: {
      accessToken: string;
      classId?: string;
      subjectId?: string;
      searchQuestion?:string,
      difficultyLevel?: string;
      page: number;
      limit: number;
    }) => {
      const endUrl = new URLSearchParams();
      if (classId) endUrl.append("classId", classId);
      if (subjectId) endUrl.append("subjectId", subjectId);
      if (difficultyLevel) endUrl.append("difficultyLevel", difficultyLevel);
      if(searchQuestion) endUrl.append("searchQuestion", searchQuestion);
      endUrl.append("page", String(page));
      endUrl.append("limit", String(limit));
      const getQuestionsApiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.questions.getQuestions}?${endUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const getQuestionsApiJsonResponse = await getQuestionsApiResponse.json();
      console.log(getQuestionsApiJsonResponse)
      return getQuestionsApiJsonResponse;
    }
  );
  
  export const QuestionSlice = createSlice({
    name: "Question",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getQuestions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getQuestions.fulfilled, (state, action) => {
          state.loading = false;
          const transformedData: QuestionInterface[] = action?.payload?.data?.result?.map(
            (que: ApiResponseQuestionInterface) => {
              const { _id,subjectInfo,classInfo,classId,subjectId, ...rest } = que;
              return {
                questionId: _id,
                subjectName: subjectInfo?.subjectName,
                className:classInfo?.className,
                classId:classInfo?._id,
                subjectId:subjectInfo?._id,
                ...rest,
              };
            }
          );
          state.data = transformedData;
          state.totalQuestions = action?.payload?.data?.totalRecords
        })
        .addCase(getQuestions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to delete class.";
        });
    },
  });
  
  export default QuestionSlice.reducer;
  