import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestAuthFailure,
  sendAuthRequest,
  signOutSuccess,
} from "../authSlice";

const signOut = createAsyncThunk("/auth/signOut", async (_, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  dispatch(sendAuthRequest());
  try {
    //Make API call to sign out user
    const requestBody = {
      query: `query {
        signOut
      }`,
    };

    let res = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await res.json();
    console.log(resJson);

    if (resJson.errors !== undefined) {
      throw new Error(resJson.errors[0].message);
    }
  } catch (error) {
    console.log("Sign Out Error.");
    dispatch(requestAuthFailure("Unable to Sign Out"));
  }
  dispatch(signOutSuccess());
});

export default signOut;
