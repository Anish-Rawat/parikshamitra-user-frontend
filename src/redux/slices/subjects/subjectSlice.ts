import {
    ApiResponseSubjectInterface,
    SubjectInterface,
    SubjectState,
  } from "@/common/interface";
import { API_URIS } from "@/utils/constant";
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  
  const initialState: SubjectState = {
    data: [],
    totalSubjects:0,
    loading: false,
    error: null,
  };
  
  export const getSubjects = createAsyncThunk(
    "getSubjects",
    async({accessToken,classId,limit,page}:{accessToken:string,classId?:string,page?:number,limit?:number})=>{
      const endUrl = new URLSearchParams();
      if(classId) endUrl.append("classId",classId)
      endUrl.append("page",String(page))
      endUrl.append("limit",String(limit))
      const filteredSubjectApiResponse = await fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.subjects.getSubjects}?${endUrl}`,
        {
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            authorization : `Bearer ${accessToken}`
          },
        }
      )
      const filteredSubjectApiJsonResponse = await filteredSubjectApiResponse.json();
      return filteredSubjectApiJsonResponse
    }
  )
  
  export const subjectSlice = createSlice({
    name: "Subject",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getSubjects.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getSubjects.fulfilled, (state, action) => {
          state.loading = false;
          const transformedData: SubjectInterface[] =
            action?.payload?.data?.result?.map(
              (cls: ApiResponseSubjectInterface) => {
                const { _id, ...rest } = cls;
                return {
                  subjectId: _id,
                  ...rest,
                };
              }
            );
          state.data = transformedData;
          state.totalSubjects = action.payload?.data?.totalRecords
        })
        .addCase(getSubjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to get class.";
        });
    },
  });
  
  export default subjectSlice.reducer;
  