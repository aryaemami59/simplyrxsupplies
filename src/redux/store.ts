import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import { addedSlice } from "./addedSlice.js"
import { apiSlice } from "./apiSlice.js"

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
              /* @__PURE__ */ createLogger({
                collapsed: true,
                diff: true,
                duration: true,
              }),
            ),
    enhancers: getDefaultEnhancers => getDefaultEnhancers(),
    preloadedState,
    reducer: rootReducer,
  })

export const store = setupStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
