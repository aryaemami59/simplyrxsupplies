import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import addedReducer from "./addedSlice";
import { apiSlice } from "./apiSlice";

// const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();

const logger = createLogger({ collapsed: true, diff: true, duration: true });

// const element = new Tuple(logger);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
          thunk: true,
        }).concat(apiSlice.middleware)
      : getDefaultMiddleware({
          actionCreatorCheck: true,
          immutableCheck: true,
          serializableCheck: true,
          thunk: true,
        }).concat(
          apiSlice.middleware,
          logger as ReturnType<typeof getDefaultMiddleware>[number]
        ),
  reducer: {
    added: addedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // devTools: {}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
