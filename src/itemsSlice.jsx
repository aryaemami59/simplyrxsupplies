import { createSlice } from "@reduxjs/toolkit";
import items from "./data/items.json";

const initialState = {
  itemsArray: items,
};

export const itemsSlice = createSlice({
  name: "myItems",
  initialState,
  // reducers: {
  //   setItemsAdded: (state, action) => {
  //     return { ...state, itemsAdded: [...action.payload, ...state.itemsAdded] };
  //   },
  // },
});

export const selectAllItems = state => state.myItems.itemsArray;

export const selectItemsByVendor = vendor => state => {
  return state.myItems.itemsArray.filter(e => e[vendor]);
};

export const itemsReducer = itemsSlice.reducer;
