import { createEntityAdapter } from "@reduxjs/toolkit";

import { CategoriesArray } from "../../types/redux";
import { RootState } from "../store";

export const categoriesAdapter = createEntityAdapter<CategoriesArray>();

export const categoriesAdapterSelectors =
  categoriesAdapter.getSelectors<RootState>(state => state.added.categories);
