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

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  // refetchOnFocus: true,
  endpoints: builder => ({
    getMain: builder.query<SuppliesState, BoxedVoid>({
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

export const selectMainResults = endpoints.getMain.select()

export const selectMainData = createSelectorWeakMap(
  [selectMainResults],
  results => results.data,
)

export const selectItemsData = createSelectorWeakMap([selectMainData], data =>
  ENTITY_ADAPTERS.items.setAll(
    ADAPTER_INITIAL_STATES.items,
    data?.items ?? EMPTY_ARRAY,
  ),
)

export const selectVendorsData = createSelectorWeakMap([selectMainData], data =>
  ENTITY_ADAPTERS.vendors.setAll(
    ADAPTER_INITIAL_STATES.vendors,
    data?.vendors ?? EMPTY_ARRAY,
  ),
)

export const selectCategoriesData = createSelectorWeakMap(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? EMPTY_ARRAY,
    ),
)

export const apiSelectors = {
  selectCategoriesData,
  selectItemsData,
  selectMainData,
  selectVendorsData,
} as const
