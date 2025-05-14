import {
    ApiResponseClassInterface,
    ClassInterface,
    ClassState,
  } from "@/common/interface";
import { API_URIS } from "@/utils/contant";
  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
  
  const initialState: ClassState = {
    data: [],
    loading: false,
    error: null,
  };

  export const getClasses = createAsyncThunk(
    "getClasses",
    async ({ accessToken }: { accessToken: string }) => {
      const getClassesApiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.classes.getClassesAndStreams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const getClassesApiJsonResponse = await getClassesApiResponse.json();
      return getClassesApiJsonResponse;
    }
  );
  export const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
      updateReduxClassList(
        state,
        action: PayloadAction<ApiResponseClassInterface[]>
      ) {
        const transformedData: ClassInterface[] = action.payload.map((cls) => {
          const { _id, ...rest } = cls;
          return { ...rest, classId: _id };
        });
        state.data = transformedData;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getClasses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getClasses.fulfilled, (state, action) => {
          state.loading = false;
          const transformedData : ClassInterface[]= action?.payload?.data?.map((cls:ApiResponseClassInterface)=>{
              const {_id,...rest} = cls;
              return {
                  classId:_id,
                  ...rest,
              }
          })
          state.data = transformedData;
        })
        .addCase(getClasses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to delete class.";
        });
    },
  });
  export const { updateReduxClassList } = classSlice.actions;
  export default classSlice.reducer;
  