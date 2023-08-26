import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import { Item, OldItem, OldSupplies, VendorName } from "../types/api";
import { Cart, SuppliesEntityState } from "../types/redux";
import { cartItemsAdapter } from "./adapters/cartItemsAdapter";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: build => ({
    getMain: build.query<SuppliesEntityState, void>({
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
              items: cartItemsAdapter.getInitialState(),
            })
          ),
        };
      },
    }),
  }),
});

export const { reducerPath, useGetMainQuery } = apiSlice;
