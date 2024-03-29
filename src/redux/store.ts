import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import type { setupStore } from "../tests/test-utils/testUtils";
import addedSlice from "./addedSlice";
import apiSlice from "./apiSlice";

const logger = createLogger({ collapsed: true, diff: true, duration: true });

export const rootReducer = combineReducers({
  [addedSlice.reducerPath]: addedSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware().concat(apiSlice.middleware)
      : getDefaultMiddleware({
          actionCreatorCheck: true,
          immutableCheck: true,
          serializableCheck: true,
          thunk: true,
        }).concat(
          apiSlice.middleware,
          logger as ReturnType<typeof getDefaultMiddleware>[number]
        ),
  reducer: rootReducer,
  // enhancers: getDefaultEnhancers => getDefaultEnhancers(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

// setupListeners(store.dispatch, (dispatch, {onOnline}) => );
