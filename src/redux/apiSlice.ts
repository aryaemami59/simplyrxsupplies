import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import API_URL from "../data/fetchInfo"
import type { Supplies } from "../types/api"
import type { Cart, SuppliesState } from "../types/reduxHelperTypes"
import EMPTY_ARRAY from "../utils/emptyArray"
import ADAPTER_INITIAL_STATES from "./adapterInitialStates"
import { createSelectorWeakMap } from "./createSelectors"
import ENTITY_ADAPTERS from "./entityAdapters"

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getMain: builder.query<SuppliesState, void>({
      query: () => "",
      transformResponse: (supplies: Supplies) => {
        const { items, vendors, categories } = supplies
        return {
          items,
          vendors,
          categories,
          cart: vendors.map<Cart>(({ id }) => ({
            id,
            itemIds: EMPTY_ARRAY,
          })),
        }
      },
    }),
  }),
})

export const { useGetMainQuery, endpoints } = apiSlice

export const selectMainResults = endpoints.getMain.select()

export const selectMainData = createSelectorWeakMap(
  [selectMainResults],
  results => results.data,
)

console.log(Object.keys(selectMainResults))

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
  selectMainData,
  selectItemsData,
  selectVendorsData,
  selectCategoriesData,
} as const

export default apiSlice
