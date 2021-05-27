import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "../slices/darkmode-slice/darkModeSlice";
import linkCollectionReducer from "../slices/linkCollection-slice/linkCollectionSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    linkCollection: linkCollectionReducer,
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
