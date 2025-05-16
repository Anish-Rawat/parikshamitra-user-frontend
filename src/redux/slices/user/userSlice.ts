import { TestState } from "@/common/interface";
import { API_URIS } from "@/utils/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TestState = {
  getTestsByUserId: {
    testsListing: [],
    loading: false,
    error: null,
  },
  getTests: {
    testsListing: [],
    totalTests: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
};

export const getTestListsByUserId = createAsyncThunk(
  "getTestLists",
  async ({ accessToken, userId }: { accessToken: string; userId: string }) => {
    const getTestListsByUserIdApiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS?.user?.createTest}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const getTestListsByUserIdJsonResponse = await getTestListsByUserIdApiResponse.json();
    return getTestListsByUserIdJsonResponse;
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getTestListsByUserId.pending,(state)=>{
            state.getTestsByUserId.loading = true;
            state.getTestsByUserId.error = null;
        })
        .addCase(getTestListsByUserId.fulfilled,(state,action)=>{
            state.getTestsByUserId.loading = false;
            
        })
        .addCase(getTestListsByUserId.rejected,(state,action)=>{
            state.getTestsByUserId.loading = false;
            state.getTestsByUserId.error = action.error.message || "Failed to get user all test lists. "
        })
  },
});
