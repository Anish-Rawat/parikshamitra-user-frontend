import { AuthState, TokenState, UserState } from "@/common/interface";
import { API_URIS } from "@/utils/constant";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  logout: {
    loading: false,
    error: null,
  },
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
  user: {
    userName: "",
    email: "",
    status: "active",
    profilePicture: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/signUpUser",
  async ({
    email,
    userName,
    password,
  }: {
    email: string;
    userName: string;
    password: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.auth.register}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userName, password }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ accessToken }: { accessToken: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.auth.logout}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<TokenState>
    ) => {
      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.tokens.accessToken = "";
      state.tokens.refreshToken = "";
    },
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    clearUserInfo: (state) => {
      state.user = {
        userName: "",
        email: "",
        status: "active",
        profilePicture: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logout.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logout.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logout.loading = false;
        state.logout.error = "Logout failed";
      });
  }
});

export const { setTokens, clearTokens, setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
