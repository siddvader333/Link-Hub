import { createSlice } from "@reduxjs/toolkit";

export interface DarkModeState {
  status: boolean;
}

const initialState: DarkModeState = {
  status: false,
};

//Below we use create Slice to handle the setup of the darkmode reducer along with the
//initial state.

export const darkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    darkModeToggle: (state) => {
      state.status = !state.status;
    },
  },
});

export const { darkModeToggle } = darkModeSlice.actions;

//export const selectDarkMode = (state: DarkModeState) => state.status;

const darkModeReducer = darkModeSlice.reducer;

export default darkModeReducer;
