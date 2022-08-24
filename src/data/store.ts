import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { addedReducer, itemReducer } from "../addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    item: itemReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
