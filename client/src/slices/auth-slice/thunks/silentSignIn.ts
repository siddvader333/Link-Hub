import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockGetAuthData } from "../../../mocks/apiMocks";
import {
  AuthData,
  requestAuthFailure,
  sendAuthRequest,
  signInSuccess,
} from "../authSlice";

const silentSignIn = createAsyncThunk("/auth/silentSignIn", (_, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  dispatch(sendAuthRequest());
  let res: AuthData = {
    token: undefined,
    tokenExpiration: undefined,
    userId: undefined,
  };
  try {
    /*Make API Call to Refresh Access Token */
    res = mockGetAuthData();
  } catch (error) {
    console.log("Silent Sign In Error.");
    dispatch(requestAuthFailure("Unable to silently sign user in."));
  } finally {
    dispatch(
      signInSuccess({
        token: res.token,
        tokenExpiration: JSON.stringify(res.tokenExpiration),
        userId: res.userId,
      })
    );
  }
});
