import { createAsyncThunk } from "@reduxjs/toolkit";
import { LinkItem } from "../../link-slice/linkSlice";
import { sendCollectionRequest } from "../collectionSlice";

const openCollection = createAsyncThunk(
  "/collection/openCollection",
  async (
    args: {
      linkList: LinkItem[];
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
    const { linkList } = args;
    dispatch(sendCollectionRequest());
    linkList.forEach((link) => {
      window.open(link.linkUrl, "_blank");
    });
  }
);

export default openCollection;
