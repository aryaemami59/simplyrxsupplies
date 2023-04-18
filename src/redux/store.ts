import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import addedReducer from "./addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          thunk: true,
          serializableCheck: false,
          immutableCheck: false,
        })
      : getDefaultMiddleware({
          thunk: true,
          serializableCheck: false,
          immutableCheck: false,
        }).concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
