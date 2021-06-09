import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendLinkRequest } from "../../link-slice/linkSlice";

const openLink = createAsyncThunk(
  "/link/openLink",
  async (
    args: {
      linkUrl: string | undefined;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    const { linkUrl } = args;
    dispatch(sendLinkRequest());
    console.log(linkUrl);
    window.open(linkUrl, "_blank");
  }
);

export default openLink;
