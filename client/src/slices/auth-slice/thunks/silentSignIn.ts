import { createAsyncThunk } from "@reduxjs/toolkit";
import history from "../../../utils/history";
import {
  requestAuthFailure,
  sendAuthRequest,
  signInSuccess,
} from "../authSlice";
import refreshToken from "./refreshToken";

const silentSignIn = createAsyncThunk(
  "/auth/silentSignIn",
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendAuthRequest());
    let refreshAccessToken: {
      token: any;
      tokenExpiration: number;
      userId: any;
    };
    /* Get New Access Token using refresh token*/

    try {
      const refreshAccessTokenBody = {
        query: `query {
          refreshAccessToken {
            userId
            token
            tokenExpiration
          }
        }`,
      };

      let res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(refreshAccessTokenBody),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJson = await res.json();
      if (resJson.errors !== undefined) {
        throw new Error(resJson.errors[0].message);
      }
      refreshAccessToken = resJson.data.refreshAccessToken;
    } catch (error) {
      console.log("Error on Silent Sign In.");
      dispatch(requestAuthFailure(error.toString()));
      return;
    }

    dispatch(
      signInSuccess({
        token: refreshAccessToken.token,
        tokenExpiration: refreshAccessToken.tokenExpiration,
        userId: refreshAccessToken.userId,
      })
    );

    setInterval(async () => {
      await dispatch(refreshToken());
    }, refreshAccessToken.tokenExpiration * 1000);

    history.push("/dashboard/collections");
  }
);

export default silentSignIn;
