import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { addedReducer } from "../Redux/addedSlice";

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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
