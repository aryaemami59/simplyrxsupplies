import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { addedReducer, itemReducer } from "../addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    item: itemReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});

// console.log(store.getState());
