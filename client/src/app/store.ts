import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "../slices/darkmode-slice/darkModeSlice";
import collectionReducer from "../slices/collection-slice/collectionSlice";
import linkReducer from "../slices/link-slice/linkSlice";
import authReducer from "../slices/auth-slice/authSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    collection: collectionReducer,
    link: linkReducer,
    auth: authReducer,
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
