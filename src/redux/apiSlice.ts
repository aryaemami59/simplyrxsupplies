import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import { Item, OldItem, OldSupplies, VendorName } from "../types/api";
import { Cart, SuppliesState } from "../types/redux";
import emptyArray from "../utils/emptyArray";
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
        const newItems = baseQueryReturnValue.items.map<Item>((a: OldItem) => {
          const newVendors = a.vendors.map<number>(
            (e: VendorName) => baseQueryReturnValue.vendors[e].id
          );
          return { ...a, vendors: newVendors };
        });
        return {
          items: newItems,
          vendors: Object.values(baseQueryReturnValue.vendors),
          categories: Object.values(baseQueryReturnValue.categories),
          cart: Object.values(baseQueryReturnValue.vendors).map<Cart>(
            ({ id }) => ({
              id,
              items: ADAPTER_INITIAL_STATES.cartItems,
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
      data?.items ?? emptyArray
    )
);

export const selectVendorsData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.vendors.setAll(
      ADAPTER_INITIAL_STATES.vendors,
      data?.vendors ?? emptyArray
    )
);

export const selectCategoriesData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ENTITY_ADAPTERS.categories.setAll(
      ADAPTER_INITIAL_STATES.categories,
      data?.categories ?? emptyArray
    )
);

export default apiSlice;
