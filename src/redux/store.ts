import type { Action, ThunkAction } from "@reduxjs/toolkit";
import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import addedReducer from "./addedSlice";
import { apiSlice } from "./apiSlice";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();

const logger = createLogger({ duration: true, diff: true, collapsed: true });

export const store = configureStore({
  reducer: {
    added: addedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          thunk: true,
          serializableCheck: false,
          immutableCheck: false,
        }).concat(apiSlice.middleware)
      : getDefaultMiddleware({
          thunk: true,
          serializableCheck: true,
          immutableCheck: true,
        })
          .concat(apiSlice.middleware)
          .concat(logger)
          .concat(immutableInvariantMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
