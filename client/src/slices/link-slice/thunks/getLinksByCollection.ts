import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLinksByCollectionSuccess,
  requestLinkFailure,
  sendLinkRequest,
} from "../linkSlice";

export const getLinksByCollection = createAsyncThunk(
  "/link/getLinksByCollection",
  async (
    args: {
      collectionId: string | undefined;
      collectionTitle: string | undefined;
      accessToken: string | undefined;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    const { collectionId, collectionTitle, accessToken } = args;
    dispatch(sendLinkRequest());
    let linkList;
    try {
      console.log(accessToken);
      console.log(collectionId);
      //Make API call to fetch all links for a given collection Id
      const requestBody = {
        query: `query {
          getLinksByCollectionId(collectionId: "${collectionId}"){
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
      if (resJson.errors !== undefined) {
        throw new Error(resJson.errors[0].message);
      }
      linkList = resJson.data.getLinksByCollectionId;
    } catch (error) {
      console.log("Get Links By Collection Id Error");
      dispatch(
        requestLinkFailure("Unable to get link. Please try again later.")
      );
      return;
    }
    dispatch(
      getLinksByCollectionSuccess({
        selectedCollectionId: collectionId,
        selectedCollectionTitle: collectionTitle,
        linkList: linkList,
      })
    );
  }
);

export default getLinksByCollection;
