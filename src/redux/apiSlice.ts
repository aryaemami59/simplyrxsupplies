import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import { Supplies } from "../types/api";
import { Cart, SuppliesEntityState } from "../types/redux";
import { cartItemsAdapter } from "./adapters/cartItemsAdapter";

// const element = createApi()

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: build => ({
    getMain: build.query<SuppliesEntityState, void>({
      query: () => "",
      transformResponse: (baseQueryReturnValue: Supplies) => {
        const newItems = [...baseQueryReturnValue.items];
        newItems.forEach(a => {
          a.vendors = a.vendors.map(e => baseQueryReturnValue.vendors[e].id);
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
