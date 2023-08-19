import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { Supplies } from "../types/api";
import { Cart, SuppliesEntityState } from "../types/redux";
import { cartItemsAdapter } from "./adapters/cartItemsAdapter";

// const initialState = addedAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Supplies"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: build => ({
    getMain: build.query<SuppliesEntityState, void>({
      query: () => "",
      transformResponse: (baseQueryReturnValue: Supplies) => {
        return {
          items: baseQueryReturnValue.items,
          vendors: Object.values(baseQueryReturnValue.vendors),
          categories: Object.values(baseQueryReturnValue.categories),
          cart: Object.values(baseQueryReturnValue.vendors).map<Cart>(
            ({ id }) =>
              ({
                id,
                items: cartItemsAdapter.getInitialState(),
              }) as const
          ),
        };
      },
      // transformResponse: (baseQueryReturnValue: Supplies) => {
      //   return addedAdapter.setAll(initialState, baseQueryReturnValue.items);
      // },
    }),
  }),
});

export const { reducerPath, useGetMainQuery } = apiSlice;
