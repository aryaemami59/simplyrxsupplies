import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import { addedSlice } from "./addedSlice.js"
import { apiSlice } from "./apiSlice.js"

/**
 * The combined root reducer, merging the {@linkcode addedSlice} and
 * {@linkcode apiSlice} reducers via {@linkcode combineSlices()}.
 */
export const rootReducer = combineSlices(addedSlice, apiSlice)

/**
 * The complete state tree of the store, inferred from
 * {@linkcode rootReducer}.
 */
export type RootState = ReturnType<typeof rootReducer>

/**
 * Creates a configured Redux store, wiring up the {@linkcode apiSlice}
 * middleware and - outside of production, test, and benchmark modes - a
 * `redux-logger` middleware via {@linkcode createLogger()}.
 *
 * @param preloadedState - Optional partial {@linkcode RootState} used to hydrate the store, primarily in tests.
 * @returns The configured Redux store instance.
 */
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

/**
 * The application's singleton Redux store, created via
 * {@linkcode setupStore()}.
 */
export const store = setupStore()

/**
 * The type of the configured application store returned by
 * {@linkcode setupStore()}.
 */
export type AppStore = typeof store

/**
 * The store's {@linkcode AppStore.dispatch | dispatch} function type,
 * including middleware-augmented thunk support.
 */
export type AppDispatch = AppStore["dispatch"]
