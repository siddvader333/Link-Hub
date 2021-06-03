import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CollectionItem,
  editCollectionSuccess,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";

const editCollections = createAsyncThunk(
  "/collection/editCollection",
  async (args: CollectionItem, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendCollectionRequest());
    const { collectionId, collectionTitle } = args;
    try {
      //Make API Call to edit collection in database
    } catch (error) {
      console.log("Edit Collection Error");
      dispatch(requestCollectionFailure("Unable to Edit Collections."));
      return;
    } finally {
      //Request Succeeded --> edit local store
      dispatch(
        editCollectionSuccess({
          collectionId: collectionId,
          collectionTitle: collectionTitle,
        })
      );
    }
  }
);

export default editCollections;
