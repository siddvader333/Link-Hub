import { createAsyncThunk } from "@reduxjs/toolkit";
import history from "../../../utils/history";
import {
  requestAuthFailure,
  sendAuthRequest,
  signOutSuccess,
} from "../authSlice";

const signOut = createAsyncThunk(
  "/auth/signOut",
  async (args: { accessToken: string | undefined }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendAuthRequest());
    const { accessToken } = args;
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
          Authorization: "Bearer " + accessToken,
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
    history.push("/");
  }
);

export default signOut;
