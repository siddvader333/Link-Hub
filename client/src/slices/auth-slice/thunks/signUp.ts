import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendAuthRequest, requestAuthFailure } from "../authSlice";

export interface signUpProps {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

const signUp = createAsyncThunk(
  "/auth/signUp",
  async (args: signUpProps, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendAuthRequest());
    let data: { userId: string };
    const { name, email, password, confirmPassword } = args;
    try {
      /*Make API Call to Sign Up User */
      const requestBody = {
        query: `query{
          createUser(name: "${name}", email: "${email}", 
          password: "${password}", confirmPassword: "${confirmPassword}"){
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
      console.log("Sign Up Error");
      dispatch(requestAuthFailure("Unable to Sign Up."));
      return;
    }
  }
);

export default signUp;
