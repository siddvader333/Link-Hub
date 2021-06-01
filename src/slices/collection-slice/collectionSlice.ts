import { createSlice } from "@reduxjs/toolkit";

export interface CollectionItem {
  collectionTitle: string | undefined;
  collectionId: string | undefined;
}

export interface CollectionState {
  collectionList: CollectionItem[];
  loading: boolean;
  errorMessage: string | undefined;
}

export const initialState: CollectionState = {
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
      state.errorMessage = undefined;
    },
    editCollectionSuccess: (state, action) => {
      const index = state.collectionList
        .map((currentCollection) => {
          return currentCollection.collectionId;
        })
        .indexOf(action.payload.collectionId);
      if (index !== -1) {
        state.collectionList[index].collectionTitle =
          action.payload.collectionTitle;
      }
      state.loading = false;
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

export const {
  sendCollectionRequest,
  editCollectionSuccess,
  addCollectionSuccess,
  hydrateCollectionList,
  requestCollectionFailure,
} = collectionSlice.actions;

const collectionReducer = collectionSlice.reducer;

export default collectionReducer;
