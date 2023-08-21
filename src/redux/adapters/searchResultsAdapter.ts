import { createEntityAdapter } from "@reduxjs/toolkit";

import { SearchResultsItem } from "../../types/redux";

export const searchResultsAdapter = createEntityAdapter<SearchResultsItem>();

export const initialState = searchResultsAdapter.getInitialState();
