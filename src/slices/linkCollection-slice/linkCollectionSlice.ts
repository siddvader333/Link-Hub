import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface LinkItem {
  linkTitle: string;
  linkUrl: string;
  linkId: string;
}

export interface LinkCollectionState {
  linkList: LinkItem[];
  selectedCollectionTitle: string;
  selectedCollectionId: string;
  loading: boolean;
  errorMessage: string;
}

const initialState: LinkCollectionState = {
  linkList: [],
  selectedCollectionId: "",
  selectedCollectionTitle: "",
  loading: false,
  errorMessage: "",
};

//Create Link Collection Slice

export const linkCollectionSlice = createSlice({
  name: "linkCollection",
  initialState,
  reducers: {
    sendRequest: (state) => {
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
        .map((link) => {
          return link.linkId;
        })
        .indexOf(action.payload.linkId);
      if (index !== -1) {
        state.linkList[index].linkTitle = action.payload.linkTitle;
        state.linkList[index].linkUrl = action.payload.linkUrl;
      }
    },
    setCollectionSuccess: (state, action) => {
      state.selectedCollectionId = action.payload.selectedCollectionId;
      state.selectedCollectionTitle = action.payload.selectedCollectionTitle;
      state.linkList = action.payload.linkList;
      state.loading = false;
      state.errorMessage = "";
    },
    requestFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

/*Async Thunks here */
export const getLinkCollection = createAsyncThunk(
  "/links/getLinkCollection",
  async (collectionId: string, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    dispatch(sendRequest());
    try {
      //Make API Call to get link Collection from collectionId
      console.log("MakeAPI Call here with id:  " + collectionId);
    } catch (error) {
      console.log("error has occurred");
      dispatch(requestFailure("Unable to get Link Collection Requested"));
      return;
    }
    dispatch(
      setCollectionSuccess({
        selectedCollectionId: "123434", //mock values for now
        selectedCollectionTitle: "ooga booga",
        linkList: [],
      })
    );
  }
);

export const {
  sendRequest,
  addLinkSuccess,
  editLinkSuccess,
  setCollectionSuccess,
  requestFailure,
} = linkCollectionSlice.actions;

const linkCollectionReducer = linkCollectionSlice.reducer;

export default linkCollectionReducer;
