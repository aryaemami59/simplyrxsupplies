import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { addedReducer } from "../addedSlice";
export const store = configureStore({
  reducer: {
    added: addedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});

console.log(store.getState());
