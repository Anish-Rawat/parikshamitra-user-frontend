import { AnswersPayload, FormDataType, TestInfo } from "@/common/interface";
import { API_URIS } from "@/utils/constant";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TestInfo = {
  startTest: {
    data: {
      _id: "",
      testName: "",
      createdBy: "",
      totalQuestions: 0,
      difficultyLevel: "",
      avgScore: 0,
      createdAt: "",
      marksObtained: 0,
      subjectName: "",
      totalMarks: 0,
      updatedAt: "",
      className: "",
      isCompleted: false,
    },
    loading: false,
    error: null,
  },
  submitTest: {
    data: {
      evaluatedAnswers: [
        {
          correctAnswer: 0,
          isCorrect: false,
          questionId: "",
          submittedAnswer: "",
        },
      ],
      message: "",
      success: false,
      totalScore: 0,
    },
    loading: false,
    error: null,
  },
  testForm: {
    category: "",
    class: "",
    subject: "",
    difficulty: "",
    numberOfQuestions: "",
    testName: "",
  },
};

export const createTest = createAsyncThunk(
  "create-test",
  async ({
    accessToken,
    testName,
    difficultyLevel,
    totalQuestions,
    subjectId,
    classId,
  }: {
    accessToken: string;
    testName: string;
    difficultyLevel: string;
    totalQuestions: number;
    subjectId: string;
    classId: string;
  }) => {
    const createTestApiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.tests.createTest}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          testName,
          difficultyLevel,
          totalQuestions,
          subjectId,
          classId,
        }),
      }
    );
    const createTestApiJsonResponse = await createTestApiResponse.json();
    return createTestApiJsonResponse.response;
  }
);

export const submitTest = createAsyncThunk(
  "submit-test",
  async ({
    accessToken,
    testId,
    answers,
  }: {
    accessToken: string;
    testId: string;
    answers: AnswersPayload[];
  }) => {
    const submitTestAPiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.tests.submitTest}?testId=${testId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          answers,
        }),
      }
    );
    const submitTestAPiJsonResponse = await submitTestAPiResponse.json();
    return submitTestAPiJsonResponse;
  }
);

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormDataType>) => {
      return {
        ...state,
        testForm: action.payload,
      };
    },
    resetTest: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTest.pending, (state) => {
        state.startTest.loading = true;
        state.startTest.error = null;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.startTest.data = action.payload;
        state.startTest.loading = false;
      })
      .addCase(createTest.rejected, (state, action) => {
        state.startTest.loading = false;
        state.startTest.error =
          action.error.message ?? "Failed to delete class.";
      })
      .addCase(submitTest.pending, (state) => {
        state.submitTest.loading = true;
        state.submitTest.error = null;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.submitTest.data = action.payload;
        state.submitTest.loading = false;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.submitTest.loading = false;
        state.submitTest.error =
          action.error.message ?? "Failed to delete class.";
      });
  },
});
export const { setFormData, resetTest } = testSlice.actions;
export default testSlice.reducer;
