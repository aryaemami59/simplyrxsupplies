import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import logger from "redux-logger";
import { addedReducer, itemReducer } from "../addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
    item: itemReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
