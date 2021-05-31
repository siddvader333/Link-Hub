import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockGetCollections } from '../../mocks/apiMocks';

export interface CollectionItem {
	collectionTitle: string | undefined;
	collectionId: string | undefined;
}

export interface CollectionState {
	collectionList: CollectionItem[];
	selectedCollectionId: string | undefined;
	selectedCollectionTitle: string | undefined;
	loading: boolean;
	errorMessage: string | undefined;
}

const initialState: CollectionState = {
	collectionList: [],
	selectedCollectionId: undefined,
	selectedCollectionTitle: undefined,
	loading: false,
	errorMessage: undefined
};

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		sendCollectionRequest: (state) => {
			state.loading = true;
		},
		addCollectionSuccess: (state, action) => {
			state.collectionList.push({
				collectionTitle: action.payload.collectionTitle,
				collectionId: action.payload.collectionId
			});
			state.loading = false;
			state.errorMessage = '';
		},
		editCollectionSuccess: (state, action) => {
			const index = state.collectionList
				.map((currentCollection) => {
					return currentCollection.collectionId;
				})
				.indexOf(action.payload.linkId);
			if (index !== -1) {
				state.collectionList[index].collectionTitle = action.payload.collectionTitle;
			}
		},
		selectCollectionSuccess: (state, action) => {
			state.selectedCollectionId = action.payload.selectedCollectionId;
			state.selectedCollectionTitle = action.payload.selectedCollectionTitle;
			state.loading = false;
			state.errorMessage = '';
		},
		hydrateCollectionList: (state, action) => {
			state.collectionList = action.payload.collectionList;
		},
		requestCollectionFailure: (state, action) => {
			state.loading = false;
			state.errorMessage = action.payload.errorMessage;
		}
	}
});

/*Async Thunks here */
export const getCollections = createAsyncThunk('/collection/getCollections', async (_, thunkAPI) => {
	const dispatch = thunkAPI.dispatch;
	let collectionList;
	dispatch(sendCollectionRequest());
	try {
		//Make API Call to get link Collection from collectionId
		collectionList = mockGetCollections();
	} catch (error) {
		console.log('error has occurred');
		dispatch(requestCollectionFailure('Unable to get Collections'));
		return;
	}
	/*Request Succeeded -- add collections to state */
	console.log(collectionList);
	dispatch(
		hydrateCollectionList({
			collectionList: collectionList
		})
	);
});

export const {
	sendCollectionRequest,
	editCollectionSuccess,
	addCollectionSuccess,
	selectCollectionSuccess,
	hydrateCollectionList,
	requestCollectionFailure
} = collectionSlice.actions;

const collectionReducer = collectionSlice.reducer;

export default collectionReducer;
