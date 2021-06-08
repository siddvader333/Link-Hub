import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestAuthFailure,
  sendAuthRequest,
  signInSuccess,
} from "../authSlice";
import refreshToken from "./refreshToken";

export interface signInProps {
  email: String | undefined;
  password: String | undefined;
}
const signIn = createAsyncThunk(
  "/auth/signIn",
  async (args: signInProps, thunkAPI) => {
    const { email, password } = args;
    const dispatch = thunkAPI.dispatch;
    dispatch(sendAuthRequest());
    let data: { token: any; tokenExpiration: number; userId: any };

    try {
      //Make API call to sign in user given credentials
      const requestBody = {
        query: `query {
          loginUser(email: "${email}", password:"${password}"){
            token
            tokenExpiration
            userId
          }
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
      data = resJson.data.loginUser;
    } catch (error) {
      console.log("Sign In Error");
      dispatch(requestAuthFailure(error.toString()));
      return;
    }

    dispatch(
      signInSuccess({
        token: data.token,
        tokenExpiration: data.tokenExpiration,
        userId: data.userId,
      })
    );

    //dispatch action to set timer
    //await dispatch(refreshToken());

    setInterval(async () => {
      await dispatch(refreshToken());
    }, data.tokenExpiration * 1000);
  }
);

export default signIn;
