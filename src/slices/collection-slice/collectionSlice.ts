import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockGetCollections } from "../../mocks/apiMocks";
import { v4 as uuidv4 } from "uuid";

export interface CollectionItem {
  collectionTitle: string | undefined;
  collectionId: string | undefined;
}

export interface CollectionState {
  collectionList: CollectionItem[];
  loading: boolean;
  errorMessage: string | undefined;
}

const initialState: CollectionState = {
  collectionList: [],
  loading: false,
  errorMessage: undefined,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    sendCollectionRequest: (state) => {
      state.loading = true;
    },
    addCollectionSuccess: (state, action) => {
      state.collectionList.push({
        collectionTitle: action.payload.collectionTitle,
        collectionId: action.payload.collectionId,
      });
      state.loading = false;
      state.errorMessage = "";
    },
    editCollectionSuccess: (state, action) => {
      const index = state.collectionList
        .map((currentCollection) => {
          return currentCollection.collectionId;
        })
        .indexOf(action.payload.collectionId);
      console.log(index);
      if (index !== -1) {
        state.collectionList[index].collectionTitle =
          action.payload.collectionTitle;
      }
    },
    hydrateCollectionList: (state, action) => {
      state.collectionList = action.payload.collectionList;
    },
    requestCollectionFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

/*Async Thunks here */
export const getCollections = createAsyncThunk(
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
    }
    /*Request Succeeded -- add collections to state */
    dispatch(
      hydrateCollectionList({
        collectionList: collectionList,
      })
    );
  }
);

export const editCollections = createAsyncThunk(
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
    }
    //Request Succeeded --> edit local store
    dispatch(
      editCollectionSuccess({
        collectionId: collectionId,
        collectionTitle: collectionTitle,
      })
    );
  }
);

export const addCollection = createAsyncThunk(
  "/collection/addCollection",
  (args: { collectionTitle: string }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const { collectionTitle } = args;
    const newCollectionId = uuidv4();
    try {
      //Make API Call to Create new Collection and add to database
    } catch (error) {
      console.log("Add Collection Error");
      dispatch(requestCollectionFailure("Unable to add new collection."));
      return;
    }

    dispatch(
      addCollectionSuccess({
        collectionTitle: collectionTitle,
        collectionId: newCollectionId,
      })
    );
  }
);

export const {
  sendCollectionRequest,
  editCollectionSuccess,
  addCollectionSuccess,
  hydrateCollectionList,
  requestCollectionFailure,
} = collectionSlice.actions;

const collectionReducer = collectionSlice.reducer;

export default collectionReducer;
