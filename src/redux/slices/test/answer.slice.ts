import { TestAnswers } from "@/common/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TestAnswers[] = [];

export const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswers: (state, action: PayloadAction<TestAnswers>) => {
      const { questionId, answer } = action.payload;
      const existingIndex = state.findIndex(
        (item) => item.questionId === questionId
      );

      if (existingIndex !== -1) {
        state[existingIndex].answer = answer;
      } else {
        state.push({ questionId, answer });
      }
    },
  },
});
export const { setAnswers } = answerSlice.actions;
export default answerSlice.reducer;
