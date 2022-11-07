import { configureStore } from "@reduxjs/toolkit";
import { addedReducer } from "./addedSlice";

export const store = configureStore({
  reducer: {
    added: addedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
