import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import addedReducer from "./addedSlice";

const logger = createLogger();

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
