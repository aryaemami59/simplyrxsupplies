import { createEntityAdapter } from "@reduxjs/toolkit";

import { Item } from "../../types/api";
import { RootState } from "../store";

export const itemsAdapter = createEntityAdapter<Item>();

export const itemsAdapterSelectors = itemsAdapter.getSelectors<RootState>(
  state => state.added.items
);
