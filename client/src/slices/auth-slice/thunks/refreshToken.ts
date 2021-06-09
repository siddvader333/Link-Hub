import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  refreshAccessTokenSuccess,
  requestAuthFailure,
  sendAuthRequest,
} from "../authSlice";

const refreshToken = createAsyncThunk(
  "/auth/refreshToken",
  async (args, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    //const accessToken = useAppSelector((state) => state.auth.authData.token);
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
      console.log("Error Refreshing Access Token");
      dispatch(requestAuthFailure("Error Refreshing Access Token."));
      return;
    }

    dispatch(
      refreshAccessTokenSuccess({
        token: refreshAccessToken.token,
        tokenExpiration: refreshAccessToken.tokenExpiration,
        userId: refreshAccessToken.userId,
      })
    );
  }
);

export default refreshToken;
