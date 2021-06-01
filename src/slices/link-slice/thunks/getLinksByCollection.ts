import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockGetLinkList } from "../../../mocks/apiMocks";
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
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    const { collectionId, collectionTitle } = args;
    dispatch(sendLinkRequest());
    let linkList;
    try {
      //Make API call to fetch all links for a given collection Id
      linkList = mockGetLinkList();
    } catch (error) {
      console.log("Get Links By Collection Id Error");
      dispatch(requestLinkFailure("Unable to get links by collection Id"));
      return;
    } finally {
      dispatch(
        getLinksByCollectionSuccess({
          selectedCollectionId: collectionId,
          selectedCollectionTitle: collectionTitle,
          linkList: linkList,
        })
      );
    }
  }
);

export default getLinksByCollection;
