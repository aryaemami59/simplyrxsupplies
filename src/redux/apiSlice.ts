import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import API_URL from "../data/fetchInfo";
import type { Supplies } from "../types/api";
import type {
  Cart,
  SuppliesState,
  WithOutputSelectorFields,
} from "../types/reduxHelperTypes";
import EMPTY_ARRAY from "../utils/emptyArray";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { createSelectorWeakmap } from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getMain: builder.query<SuppliesState, void>({
      query: () => "",
      transformResponse: (supplies: Supplies) => {
        const { items, vendors, categories } = supplies;
        return {
          items,
          vendors,
          categories,
          cart: vendors.map<Cart>(({ id }) => ({
            id,
            itemIds: EMPTY_ARRAY,
          })),
        };
      },
    }),
  }),
});

export const { useGetMainQuery, endpoints } = apiSlice;

export const selectMainResults =
  endpoints.getMain.select() as WithOutputSelectorFields<
    ReturnType<typeof endpoints.getMain.select>
  >;

export const selectMainData = createSelectorWeakmap(
  [selectMainResults],
  results => results.data
);

export const selectItemsData = createSelectorWeakmap([selectMainData], data =>
  ENTITY_ADAPTERS.items.setAll(
    ADAPTER_INITIAL_STATES.items,
    data?.items ?? EMPTY_ARRAY
  )
);

export const selectVendorsData = createSelectorWeakmap([selectMainData], data =>
  ENTITY_ADAPTERS.vendors.setAll(
    ADAPTER_INITIAL_STATES.vendors,
    data?.vendors ?? EMPTY_ARRAY
  )
);

export const selectCategoriesData = createSelectorWeakmap(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? EMPTY_ARRAY
    )
);

export const apiSelectors = {
  selectMainData,
  selectItemsData,
  selectVendorsData,
  selectCategoriesData,
} as const;

export default apiSlice;
