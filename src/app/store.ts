import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "../slices/darkmode-slice/darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
