import { createAsyncThunk } from "@reduxjs/toolkit";
//import makeApiRequestWithAuthRefresh from "../../../utils/apiCallHelper";
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
      /*const requestBody = {
        query: `query {
          getCollectionsByUserId{
            collectionId
            collectionTitle
          }
        }`,
      };
*/
      /*let res = await makeApiRequestWithAuthRefresh({
        method: "POST",
        body: JSON.stringify(requestBody),
      });*/
      // const resJson = await res.json();
      //if (resJson.errors !== undefined) {
      // throw new Error(resJson.errors[0].message);
      //}
      //collectionList = resJson.data.getCollectionsByUserId;
    } catch (error) {
      console.log("Get Collection Error");
      dispatch(requestCollectionFailure("Unable to get Collections"));
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
