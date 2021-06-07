import { createSlice } from "@reduxjs/toolkit";

export interface AuthData {
  token: String | undefined;
  tokenExpiration: string | undefined;
  userId: string | undefined;
}
export interface AuthState {
  isAuthed: boolean;
  authData: AuthData;
  loading: boolean;
  errorMessage: String | undefined;
}

export const initialState: AuthState = {
  isAuthed: false,
  authData: {
    token: undefined,
    tokenExpiration: undefined,
    userId: undefined,
  },
  loading: false,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendAuthRequest: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      const { token, tokenExpiration, userId } = action.payload;
      state.authData.token = token;
      let tokenExpiryDate = new Date();
      tokenExpiryDate.setSeconds(
        tokenExpiryDate.getSeconds() + tokenExpiration
      );
      state.authData.tokenExpiration = tokenExpiryDate.toDateString();
      state.authData.userId = userId;
      state.loading = false;
      state.errorMessage = undefined;
      state.isAuthed = true;
    },
    signOutSuccess: (state) => {
      state.authData.token = undefined;
      state.authData.tokenExpiration = undefined;
      state.authData.userId = undefined;
      state.loading = false;
      state.errorMessage = undefined;
      state.isAuthed = false;
    },
    refreshAccessTokenSuccess: (state, action) => {
      const { token, tokenExpiration, userId } = action.payload;
      state.authData.token = token;
      state.authData.tokenExpiration = tokenExpiration;
      state.authData.userId = userId;
      state.loading = false;
      state.errorMessage = undefined;
      state.isAuthed = true;
    },
    requestAuthFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  sendAuthRequest,
  signInSuccess,
  signOutSuccess,
  requestAuthFailure,
  refreshAccessTokenSuccess,
} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
