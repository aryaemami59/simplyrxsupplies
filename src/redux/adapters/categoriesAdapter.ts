import { createEntityAdapter } from "@reduxjs/toolkit";

import { Category } from "../../types/api";

export const categoriesAdapter = createEntityAdapter<Category>();

export const initialState = categoriesAdapter.getInitialState();
