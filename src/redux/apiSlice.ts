import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { Item, OldItem, OldSupplies, VendorName } from "../types/api";
import type { Cart, SuppliesState } from "../types/redux";
import EMPTY_ARRAY from "../utils/emptyArray";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import ENTITY_ADAPTERS from "./entityAdapters";
import { createDraftSafeRootSelector } from "./hooks";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: build => ({
    getMain: build.query<SuppliesState, void>({
      query: () => "",
      transformResponse: (baseQueryReturnValue: OldSupplies) => {
        const newItems = baseQueryReturnValue.items.map<Item>(
          (oldItem: OldItem) => {
            const newVendors = oldItem.vendors.map<number>(
              (vendorName: VendorName) =>
                baseQueryReturnValue.vendors[vendorName].id
            );
            return { ...oldItem, vendors: newVendors };
          }
        );
        return {
          items: newItems,
          vendors: Object.values(baseQueryReturnValue.vendors),
          categories: Object.values(baseQueryReturnValue.categories),
          cart: Object.values(baseQueryReturnValue.vendors).map<Cart>(
            ({ id }) => ({
              id,
              itemIds: EMPTY_ARRAY,
            })
          ),
        };
      },
    }),
  }),
});

export const { useGetMainQuery, endpoints } = apiSlice;

export const selectMainResults = endpoints.getMain.select();

export const selectMainData = createDraftSafeRootSelector(
  [selectMainResults],
  results => results.data
);

export const selectItemsData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.items.setAll(
      ADAPTER_INITIAL_STATES.items,
      data?.items ?? EMPTY_ARRAY
    )
);

export const selectVendorsData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.vendors.setAll(
      ADAPTER_INITIAL_STATES.vendors,
      data?.vendors ?? EMPTY_ARRAY
    )
);

export const selectCategoriesData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? EMPTY_ARRAY
    )
);

export default apiSlice;
