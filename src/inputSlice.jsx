import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const empty = [];

const initialState = {
  // val: "",
  listItems: empty,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setListItems: (state, action) => {
      state.listItems === empty && console.log(state.listItems);
      // console.log(state.listItems);
      // console.log(state.listItems === initialState);
      // console.log(action.payload.length);
      // state.listItems = action.payload.length ? action.payload : empty;
      state.listItems = action.payload;
    },
    removeListItems: (state, action) => {
      state.listItems = state.listItems.filter(
        ({ name }) => name !== action.payload.name
      );
    },
  },
});

export const selectAllListItems = createSelector(
  state => state.input.listItems,
  listItems => listItems
  // state => JSON.stringify(state.input.listItems),
  // listItems => JSON.parse(listItems)
);

// export const selectAllListItems = state => state.input.listItems;

export const { setListItems, removeListItems } = inputSlice.actions;

export const inputReducer = inputSlice.reducer;
