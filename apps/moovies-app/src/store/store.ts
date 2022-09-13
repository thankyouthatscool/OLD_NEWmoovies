import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import appReducer from "./app/appSlice";
import settingsReducer from "./settings/settingsSlice";

export const store = configureStore({
  reducer: { app: appReducer, settings: settingsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
