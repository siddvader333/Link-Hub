import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCollectionSuccess,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";

const addCollection = createAsyncThunk(
  "/collection/addCollection",
  async (
    args: { collectionTitle: string; accessToken: string | undefined },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendCollectionRequest());
    const { collectionTitle, accessToken } = args;
    let newCollectionId: string | undefined = undefined;
    try {
      //Make API Call to Create new Collection and add to database
      const requestBody = {
        query: `mutation{
          createCollection(collectionInput: {collectionTitle: "${collectionTitle}"}){
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
      newCollectionId = resJson.data.createCollection.collectionId;
    } catch (error) {
      console.log("Add Collection Error");
      dispatch(requestCollectionFailure("Unable to add new collection."));
      return;
    }
    dispatch(
      addCollectionSuccess({
        collectionTitle: collectionTitle,
        collectionId: newCollectionId,
      })
    );
  }
);

export default addCollection;
