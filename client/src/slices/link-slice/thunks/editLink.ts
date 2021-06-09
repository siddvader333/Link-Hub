import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editLinkSuccess,
  requestLinkFailure,
  sendLinkRequest,
} from "../linkSlice";

export const editLink = createAsyncThunk(
  "/link/editLink",
  async (
    args: {
      linkId: string | undefined;
      linkTitle: string | undefined;
      linkUrl: string | undefined;
      accessToken: string | undefined;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendLinkRequest());
    const { linkId, linkTitle, linkUrl, accessToken } = args;
    try {
      //Make API Call to edit link with given and update title /url
      const requestBody = {
        query: `mutation{
          editLink(linkId: "${linkId}", linkTitle: "${linkTitle}", linkUrl: "${linkUrl}"){
            linkTitle
            linkUrl
            linkId
          }
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
      console.log("Edit Link Error");
      dispatch(
        requestLinkFailure("Unable to edit link. Please try again later.")
      );
      return;
    }
    dispatch(
      editLinkSuccess({
        linkId: linkId,
        linkTitle: linkTitle,
        linkUrl: linkUrl,
      })
    );
  }
);

export default editLink;
