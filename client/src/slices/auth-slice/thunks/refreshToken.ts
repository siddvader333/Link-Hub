import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../app/hooks";
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
          //Authorization: "Bearer " + accessToken,
        },
      });

      const resJson = await res.json();
      //console.log(resJson);
      if (resJson.errors !== undefined) {
        console.log("errorrrrr");
        throw new Error(resJson.errors[0].message);
      }
      refreshAccessToken = resJson.data.refreshAccessToken;
    } catch (error) {
      console.log("Error Refreshing Access Token");
      dispatch(requestAuthFailure(error.toString()));
      return;
    }

    //console.log(refreshAccessToken);
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
