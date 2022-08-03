import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import logger from "redux-logger";
// import { itemsReducer } from "../itemsSlice";
import { addedReducer } from "../addedSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // myItems: itemsReducer,
    added: addedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});

console.log(store.getState());
