import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestAuthFailure,
  sendAuthRequest,
  signOutSuccess,
} from "../authSlice";

const signOut = createAsyncThunk("/auth/signOut", (_, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  dispatch(sendAuthRequest());
  try {
    //Make API call to sign out user
  } catch (error) {
    console.log("Sign Out Error.");
    dispatch(requestAuthFailure("Unable to Sign Out"));
  } finally {
    dispatch(signOutSuccess());
  }
});

export default signOut;
