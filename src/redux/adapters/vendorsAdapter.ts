import { createEntityAdapter } from "@reduxjs/toolkit";

import { VendorsArray } from "../../types/redux";
import { RootState } from "../store";

export const vendorsAdapter = createEntityAdapter<VendorsArray>();

export const vendorsAdapterSelectors = vendorsAdapter.getSelectors<RootState>(
  state => state.added.vendors
);
