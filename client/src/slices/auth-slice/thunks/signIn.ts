import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthData,
  requestAuthFailure,
  sendAuthRequest,
  signInSuccess,
} from "../authSlice";

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
    let data: AuthData = {
      token: undefined,
      tokenExpiration: undefined,
      userId: undefined,
    };

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

      console.log(email);
      console.log(password);
      let res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resJson = await res.json();
      if (resJson.errors !== undefined) {
        throw new Error(resJson.errors[0].message);
      }
      data = resJson.data.loginUser;
    } catch (error) {
      console.log("Sign In Error");
      dispatch(requestAuthFailure(error));
      return;
    }

    dispatch(
      signInSuccess({
        token: data.token,
        tokenExpiration: data.tokenExpiration,
        userId: data.userId,
      })
    );
  }
);

export default signIn;
