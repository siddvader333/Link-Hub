import { createSlice } from "@reduxjs/toolkit";

export interface LinkItem {
  linkTitle: string | undefined;
  linkUrl: string | undefined;
  linkId: string | undefined;
}

export interface LinkState {
  linkList: LinkItem[];
  selectedCollectionId: string | undefined;
  selectedCollectionTitle: string | undefined;
  loading: boolean;
  errorMessage: string | undefined;
}

export const initialState: LinkState = {
  linkList: [],
  selectedCollectionId: undefined,
  selectedCollectionTitle: undefined,
  loading: false,
  errorMessage: undefined,
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    sendLinkRequest: (state) => {
      state.loading = true;
    },
    addLinkSuccess: (state, action) => {
      state.linkList.push({
        linkTitle: action.payload.linkTitle,
        linkUrl: action.payload.linkUrl,
        linkId: action.payload.linkId,
      });
      state.loading = false;
      state.errorMessage = undefined;
    },
    editLinkSuccess: (state, action) => {
      const index = state.linkList
        .map((currentLink) => {
          return currentLink.linkId;
        })
        .indexOf(action.payload.linkId);
      if (index !== -1) {
        state.linkList[index].linkTitle = action.payload.linkTitle;
        state.linkList[index].linkUrl = action.payload.linkUrl;
      }
      state.loading = false;
    },
    getLinksByCollectionSuccess: (state, action) => {
      state.linkList = action.payload.linkList;
      state.selectedCollectionId = action.payload.selectedCollectionId;
      state.selectedCollectionTitle = action.payload.selectedCollectionTitle;
      state.loading = false;
      state.errorMessage = undefined;
    },
    requestLinkFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    clearLinkError: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  sendLinkRequest,
  editLinkSuccess,
  addLinkSuccess,
  getLinksByCollectionSuccess,
  requestLinkFailure,
  clearLinkError,
} = linkSlice.actions;

const linkReducer = linkSlice.reducer;

export default linkReducer;
