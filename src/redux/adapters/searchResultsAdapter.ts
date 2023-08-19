import { createEntityAdapter } from "@reduxjs/toolkit";

import { Item } from "../../types/api";
import { RootState } from "../store";

export const searchResultsAdapter = createEntityAdapter<Item>();

export const searchResultsAdapterSelectors =
  searchResultsAdapter.getSelectors<RootState>(
    state => state.added.searchResultsItemNames
  );
