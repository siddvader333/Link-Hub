import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { mockGetLinkList } from "../../mocks/apiMocks";

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

const initialState: LinkState = {
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
      state.errorMessage = "";
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
    },
    getLinksByCollectionSuccess: (state, action) => {
      state.linkList = action.payload.linkList;
      state.selectedCollectionId = action.payload.selectedCollectionId;
      state.selectedCollectionTitle = action.payload.selectedCollectionTitle;
      state.loading = false;
      state.errorMessage = "";
    },
    requestLinkFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const addLink = createAsyncThunk(
  "/link/addLink",
  async (args: { linkTitle: string; linkUrl: string }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
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

export const editLink = createAsyncThunk(
  "/link/editLink",
  (args: LinkItem, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
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

export const {
  sendLinkRequest,
  editLinkSuccess,
  addLinkSuccess,
  getLinksByCollectionSuccess,
  requestLinkFailure,
} = linkSlice.actions;

const linkReducer = linkSlice.reducer;

export default linkReducer;
