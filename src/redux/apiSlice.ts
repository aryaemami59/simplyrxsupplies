import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { OldSupplies } from "../types/api";
import type { Cart, SuppliesState } from "../types/reduxHelperTypes";
import EMPTY_ARRAY from "../utils/emptyArray";
import transformOldItemsApi from "../utils/transformOldItemsApi";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { createDraftSafeAppSelector } from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: builder => ({
    getMain: builder.query<SuppliesState, void>({
      query: () => "",
      transformResponse: (oldSupplies: OldSupplies) => {
        const newItems = transformOldItemsApi(oldSupplies);
        return {
          items: newItems,
          vendors: Object.values(oldSupplies.vendors),
          categories: Object.values(oldSupplies.categories),
          cart: Object.values(oldSupplies.vendors).map<Cart>(({ id }) => ({
            id,
            itemIds: EMPTY_ARRAY,
          })),
        };
      },
    }),
  }),
});

export const { useGetMainQuery, endpoints } = apiSlice;

const selectMainResults = endpoints.getMain.select();

const selectMainData = createDraftSafeAppSelector(
  [selectMainResults],
  results => results.data
);

export const selectItemsData = createDraftSafeAppSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.items.setAll(
      ADAPTER_INITIAL_STATES.items,
      data?.items ?? EMPTY_ARRAY
    )
);

export const selectVendorsData = createDraftSafeAppSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.vendors.setAll(
      ADAPTER_INITIAL_STATES.vendors,
      data?.vendors ?? EMPTY_ARRAY
    )
);

export const selectCategoriesData = createDraftSafeAppSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? EMPTY_ARRAY
    )
);

export default apiSlice;
