import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockGetCollections } from "../../../mocks/apiMocks";
import {
  hydrateCollectionList,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";

const getCollections = createAsyncThunk(
  "/collection/getCollections",
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    let collectionList;
    dispatch(sendCollectionRequest());
    try {
      //Make API Call to get link Collection from collectionId
      collectionList = mockGetCollections();
    } catch (error) {
      console.log("Get Collection Error");
      dispatch(requestCollectionFailure("Unable to get Collections"));
      return;
    } finally {
      /*Request Succeeded -- add collections to state */
      dispatch(
        hydrateCollectionList({
          collectionList: collectionList,
        })
      );
    }
  }
);

export default getCollections;
