import { createEntityAdapter } from "@reduxjs/toolkit";

import { CheckedVendorItems, SearchResultsItem } from "../../types/redux";

const searchResultsAdapter = createEntityAdapter<SearchResultsItem>();

export const checkedVendorItemsAdapter =
  createEntityAdapter<CheckedVendorItems>();

export default searchResultsAdapter;
