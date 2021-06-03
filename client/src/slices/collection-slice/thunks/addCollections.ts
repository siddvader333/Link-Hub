import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCollectionSuccess,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";
import { v4 as uuidv4 } from "uuid";

const addCollection = createAsyncThunk(
  "/collection/addCollection",
  (args: { collectionTitle: string }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendCollectionRequest());
    const { collectionTitle } = args;
    const newCollectionId = uuidv4();
    try {
      //Make API Call to Create new Collection and add to database
    } catch (error) {
      console.log("Add Collection Error");
      dispatch(requestCollectionFailure("Unable to add new collection."));
      return;
    } finally {
      dispatch(
        addCollectionSuccess({
          collectionTitle: collectionTitle,
          collectionId: newCollectionId,
        })
      );
    }
  }
);

export default addCollection;
