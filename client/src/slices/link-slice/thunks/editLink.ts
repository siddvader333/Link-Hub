import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LinkItem,
  editLinkSuccess,
  requestLinkFailure,
  sendLinkRequest,
} from "../linkSlice";

export const editLink = createAsyncThunk(
  "/link/editLink",
  (args: LinkItem, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendLinkRequest());
    const { linkId, linkTitle, linkUrl } = args;
    try {
      //Make API Call to edit link with given and update title /url
    } catch (error) {
      console.log("Edit Link Error");
      dispatch(requestLinkFailure("Unable to Edit Link."));
      return;
    } finally {
      dispatch(
        editLinkSuccess({
          linkId: linkId,
          linkTitle: linkTitle,
          linkUrl: linkUrl,
        })
      );
    }
  }
);

export default editLink;
