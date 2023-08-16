import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { Supplies } from "../types/api";

// const initialState = addedAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Main"],
  baseQuery: fetchBaseQuery({ baseUrl: GITHUB_URL_ITEMS }),
  endpoints: build => ({
    getMain: build.query<Supplies, void>({
      query: () => "",
      // transformResponse: (baseQueryReturnValue: Supplies) => {
      //   return addedAdapter.setAll(initialState, baseQueryReturnValue.items);
      // },
    }),
  }),
});

export const { reducerPath, useGetMainQuery } = apiSlice;
