import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../data/fetchInfo.js"
import type { Supplies } from "../types/api.js"
import type { Cart, SuppliesState } from "../types/reduxHelperTypes.js"
import { EMPTY_ARRAY } from "../utils/emptyArray.js"
import { ADAPTER_INITIAL_STATES } from "./adapterInitialStates.js"
import { createSelectorWeakMap } from "./createSelectors.js"
import { ENTITY_ADAPTERS } from "./entityAdapters.js"

/**
 * Workaround for
 * {@linkcode https://typescript-eslint.io/rules/no-invalid-void-type | @typescript-eslint/no-invalid-void-type}
 */
type BoxedVoid<T = void> = T

/**
 * RTK Query API slice that fetches the application's supply data from
 * {@linkcode API_URL}. Its single {@linkcode endpoints.getMain | getMain}
 * endpoint normalizes the response into a {@linkcode SuppliesState} and seeds
 * the initial per-vendor {@linkcode Cart} entries.
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  // refetchOnFocus: true,
  endpoints: build => ({
    getMain: build.query<SuppliesState, BoxedVoid>({
      query: () => "",
      transformResponse: (supplies: Supplies) => {
        const { categories, items, vendors } = supplies

        return {
          cart: vendors.map<Cart>(({ id }) => ({
            id,
            itemIds: EMPTY_ARRAY,
          })),
          categories,
          items,
          vendors,
        }
      },
    }),
  }),
  reducerPath: "api",
  tagTypes: ["Supplies"],
})

export const { endpoints, useGetMainQuery } = apiSlice

/**
 * Selects the raw RTK Query result object for the
 * {@linkcode endpoints.getMain | getMain} query, including its loading/error
 * status and cached `data`.
 */
export const selectMainResults = endpoints.getMain.select()

/**
 * Selects the normalized {@linkcode SuppliesState} payload from the
 * {@linkcode endpoints.getMain | getMain} query result, or `undefined` before
 * the data has loaded.
 */
export const selectMainData = createSelectorWeakMap(
  [selectMainResults],
  results => results.data,
)

/**
 * Selects all item entities as normalized entity-adapter state, built by
 * loading the fetched items into the items adapter's initial state.
 */
export const selectItemsData = createSelectorWeakMap([selectMainData], data =>
  ENTITY_ADAPTERS.items.setAll(
    ADAPTER_INITIAL_STATES.items,
    data?.items ?? EMPTY_ARRAY,
  ),
)

/**
 * Selects all vendor entities as normalized entity-adapter state, built by
 * loading the fetched vendors into the vendors adapter's initial state.
 */
export const selectVendorsData = createSelectorWeakMap([selectMainData], data =>
  ENTITY_ADAPTERS.vendors.setAll(
    ADAPTER_INITIAL_STATES.vendors,
    data?.vendors ?? EMPTY_ARRAY,
  ),
)

/**
 * Selects all category entities as normalized entity-adapter state, built by
 * loading the fetched categories into the categories adapter's initial state.
 */
export const selectCategoriesData = createSelectorWeakMap(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? EMPTY_ARRAY,
    ),
)

/**
 * Convenience grouping of the derived data selectors - categories, items, the
 * combined main data, and vendors - for the API slice.
 */
export const apiSelectors = {
  selectCategoriesData,
  selectItemsData,
  selectMainData,
  selectVendorsData,
} as const
