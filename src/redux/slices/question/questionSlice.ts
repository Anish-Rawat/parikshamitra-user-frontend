import {
    ApiResponseQuestionInterface,
    QuestionInterface,
    QuestionState,
  } from "@/common/interface";
import { API_URIS } from "@/utils/constant";
  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
  
  interface SetTimer {
    questionId?: string;
    timeLeft: number;
  }

  const initialState: QuestionState = {
    data: [],
    totalQuestions:0,
    selectedQuestions: [],
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
      return getQuestionsApiJsonResponse;
    }
  );
  
  export const QuestionSlice = createSlice({
    name: "Question",
    initialState,
    reducers: {
      setTimer: (state, action: PayloadAction<SetTimer>) => {
        const { questionId, timeLeft } = action.payload;
        const existingIndex = state.data.findIndex(
          (item) => item.questionId === questionId
        );
        if (existingIndex !== -1) {
          state.data[existingIndex].timeLeft = timeLeft;
        }
      },
      selectQuestions: (state, action: PayloadAction<QuestionInterface[]>) => {
        state.selectedQuestions = action.payload;
      },
      resetQuestions: () => {
        return initialState;
      }
    },
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
              const { _id, timeLeft = 30,subjectInfo,classInfo,classId,subjectId, ...rest } = que;
              return {
                questionId: _id,
                subjectName: subjectInfo?.subjectName,
                className:classInfo?.className,
                classId:classInfo?._id,
                subjectId:subjectInfo?._id,
                timeLeft,
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

  export const { setTimer, selectQuestions, resetQuestions } = QuestionSlice.actions;
  
  export default QuestionSlice.reducer;
  