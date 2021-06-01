import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addLinkSuccess,
  requestLinkFailure,
  sendLinkRequest,
} from "../linkSlice";
import { v4 as uuidv4 } from "uuid";

export const addLink = createAsyncThunk(
  "/link/addLink",
  async (args: { linkTitle: string; linkUrl: string }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendLinkRequest());
    const { linkTitle, linkUrl } = args;
    const newLinkId = uuidv4();
    try {
      //Make API call to add new link to current collection
    } catch (error) {
      console.log("Add Link Error");
      dispatch(requestLinkFailure("Unable to Add a new link."));
      return;
    } finally {
      dispatch(
        addLinkSuccess({
          linkId: newLinkId,
          linkTitle: linkTitle,
          linkUrl: linkUrl,
        })
      );
    }
  }
);

export default addLink;
