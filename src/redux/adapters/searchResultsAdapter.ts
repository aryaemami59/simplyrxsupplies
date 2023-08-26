import { createEntityAdapter } from "@reduxjs/toolkit";

import { SearchResultsItem } from "../../types/redux";

const searchResultsAdapter = createEntityAdapter<SearchResultsItem>();

export default searchResultsAdapter;
