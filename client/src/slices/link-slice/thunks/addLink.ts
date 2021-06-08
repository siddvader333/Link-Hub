import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addLinkSuccess,
  requestLinkFailure,
  sendLinkRequest,
} from "../linkSlice";

export const addLink = createAsyncThunk(
  "/link/addLink",
  async (
    args: {
      linkTitle: string;
      linkUrl: string;
      collectionId: string | undefined;
      accessToken: string | undefined;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendLinkRequest());
    const { linkTitle, linkUrl, accessToken, collectionId } = args;
    let newLinkId: string | undefined = undefined;
    try {
      //Make API call to add new link to current collection
      console.log(collectionId);
      const requestBody = {
        query: `mutation {
          createLink(linkInput: {collectionId: "${collectionId}"linkTitle: "${linkTitle}", linkUrl: "${linkUrl}"}){
            linkId
            linkTitle
            linkUrl
            collectionId
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
      newLinkId = resJson.data.createLink.linkId;
    } catch (error) {
      console.log("Add Link Error");
      dispatch(requestLinkFailure("Unable to Add a new link."));
      return;
    }
    dispatch(
      addLinkSuccess({
        linkId: newLinkId,
        linkTitle: linkTitle,
        linkUrl: linkUrl,
      })
    );
  }
);

export default addLink;
