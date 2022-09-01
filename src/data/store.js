import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";
import { addedReducer, itemReducer } from "../addedSlice";
export const store = configureStore({
  reducer: {
    added: addedReducer,
    item: itemReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
