import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editCollectionSuccess,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";

const editCollections = createAsyncThunk(
  "/collection/editCollection",
  async (
    args: {
      collectionId: string | undefined;
      collectionTitle: string | undefined;
      accessToken: string | undefined;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendCollectionRequest());
    const { collectionId, collectionTitle, accessToken } = args;
    try {
      //Make API Call to edit collection in database
      const requestBody = {
        query: `mutation{
          editCollection(collectionId: "${collectionId}", collectionTitle: "${collectionTitle}"){
            collectionTitle
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
    } catch (error) {
      console.log("Edit Collection Error");
      dispatch(
        requestCollectionFailure(
          "Unable to edit collection. Please try again later."
        )
      );
      return;
    }
    //Request Succeeded --> edit local store
    dispatch(
      editCollectionSuccess({
        collectionId: collectionId,
        collectionTitle: collectionTitle,
      })
    );
  }
);

export default editCollections;
