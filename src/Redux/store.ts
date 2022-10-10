import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { addedReducer } from "../Redux/addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    // item: itemReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
