import { TestInfo } from "@/common/interface";
import { API_URIS } from "@/utils/contant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TestInfo = {
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
    return createTestApiJsonResponse;
  }
);
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(createTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete class.";
      });
  },
});
export default testSlice.reducer;
