import { createAsyncThunk } from "@reduxjs/toolkit";
//import makeApiRequestWithAuthRefresh from "../../../utils/apiCallHelper";
import {
  hydrateCollectionList,
  requestCollectionFailure,
  sendCollectionRequest,
} from "../collectionSlice";

const getCollections = createAsyncThunk(
  "/collection/getCollections",
  async (args: { token: string | undefined }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    let collectionList;
    dispatch(sendCollectionRequest());
    const accessToken = args.token;
    try {
      //Make API Call to get link Collection from collectionId
      const requestBody = {
        query: `query {
          getCollectionsByUserId{
            collectionId
            collectionTitle
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
      if (resJson.errors !== undefined) {
        throw new Error(resJson.errors[0].message);
      }
      collectionList = resJson.data.getCollectionsByUserId;
    } catch (error) {
      console.log("Get Collection Error");
      dispatch(
        requestCollectionFailure(
          "Unable to get collections. Please try again later."
        )
      );
      return;
    }
    /*Request Succeeded -- add collections to state */
    dispatch(
      hydrateCollectionList({
        collectionList: collectionList,
      })
    );
  }
);

export default getCollections;
