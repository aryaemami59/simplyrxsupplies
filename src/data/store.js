import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { addedReducer, inputReducer } from "../addedSlice";
// import { inputReducer } from "../inputSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    input: inputReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});

// console.log(store.getState());
