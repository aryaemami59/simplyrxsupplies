import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

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
  reducer: rootReducer,
  enhancers: getDefaultEnhancers => getDefaultEnhancers(),
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: true, immutableCheck: false }).concat(
        apiSlice.middleware
      ),
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action
// >;

// setupListeners(store.dispatch, (dispatch, {onOnline}) => );
