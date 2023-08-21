import { createEntityAdapter } from "@reduxjs/toolkit";

import { Item } from "../../types/api";

export const itemsAdapter = createEntityAdapter<Item>();

export const initialState = itemsAdapter.getInitialState();
