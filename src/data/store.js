import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import logger from "redux-logger";
// import { itemsReducer } from "../itemsSlice";
// import { addedReducer } from "../addedSlice";
import { addedReducer } from "../addedFORSSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // myItems: itemsReducer,
    // added: addedReducer,
    added: addedReducer,
    // MCKadded: addedReducer,
    // OIadded: addedReducer,
    // GNFRadded: addedReducer,
    // SOCadded: addedReducer,
    // VSadded: addedReducer,
    // MSadded: addedReducer,
    // COVadded: addedReducer,
    // FORSadded: addedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});

console.log(store.getState());
