import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendAuthRequest, requestAuthFailure } from "../authSlice";

export interface signUpProps {
  name: String | undefined;
  email: String | undefined;
  password: String | undefined;
  confirmPassword: String | undefined;
}

const signUp = createAsyncThunk(
  "/auth/signUp",
  (args: signUpProps, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendAuthRequest());
    const { name, email, password, confirmPassword } = args;
    try {
      /*Make API Call to Sign Up User */
    } catch (error) {
      console.log("Sign Up Error");
      dispatch(requestAuthFailure("Unable to Sign Up."));
      return;
    }
  }
);

export default signUp;
