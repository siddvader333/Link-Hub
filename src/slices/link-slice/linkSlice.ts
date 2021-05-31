import { createSlice } from '@reduxjs/toolkit';

export interface LinkItem {
	linkTitle: string | undefined;
	linkUrl: string | undefined;
	linkId: string | undefined;
}

export interface LinkState {
	linkList: LinkItem[];
	loading: boolean;
	errorMessage: string | undefined;
}

const initialState: LinkState = {
	linkList: [],
	loading: false,
	errorMessage: undefined
};

export const linkSlice = createSlice({
	name: 'link',
	initialState,
	reducers: {
		sendLinkRequest: (state) => {
			state.loading = true;
		},
		addLinkSuccess: (state, action) => {
			state.linkList.push({
				linkTitle: action.payload.linkTitle,
				linkUrl: action.payload.linkUrl,
				linkId: action.payload.linkId
			});
			state.loading = false;
			state.errorMessage = '';
		},
		editLinkSuccess: (state, action) => {
			const index = state.linkList
				.map((currentLink) => {
					return currentLink.linkId;
				})
				.indexOf(action.payload.linkId);
			if (index !== -1) {
				state.linkList[index].linkTitle = action.payload.linkTitle;
			}
		},
		selectLinkListSuccess: (state, action) => {
			state.linkList = action.payload.linkList;
			state.loading = false;
			state.errorMessage = '';
		},
		requestLinkFailure: (state, action) => {
			state.loading = false;
			state.errorMessage = action.payload.errorMessage;
		}
	}
});

export const {
	sendLinkRequest,
	editLinkSuccess,
	addLinkSuccess,
	selectLinkListSuccess,
	requestLinkFailure
} = linkSlice.actions;

const linkReducer = linkSlice.reducer;

export default linkReducer;
