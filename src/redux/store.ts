import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import { addedSlice } from "./addedSlice"
import { apiSlice } from "./apiSlice"

export const rootReducer = combineSlices(addedSlice, apiSlice)

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    middleware: getDefaultMiddleware =>
      import.meta.env.PROD ||
      import.meta.env.MODE === "test" ||
      import.meta.env.MODE === "benchmark"
        ? getDefaultMiddleware().concat(apiSlice.middleware)
        : getDefaultMiddleware({
            actionCreatorCheck: true,
            immutableCheck: true,
            serializableCheck: true,
            thunk: true,
          })
            .concat(apiSlice.middleware)
            .concat(
              createLogger({
                collapsed: true,
                diff: true,
                duration: true,
              }),
            ),
    reducer: rootReducer,
    preloadedState,
    enhancers: getDefaultEnhancers => getDefaultEnhancers(),
  })

export const store = setupStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
