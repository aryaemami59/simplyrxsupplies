import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // vendor: "",
  addedArray: [],
  // FORS: [],
  // McKesson: [],
  // OrderInsite: [],
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action) => {
      console.log("addItems action.payload:", action.payload);
      state.addedArray = state.addedArray.concat(...action.payload);
      // console.log(state.addedArray);
    },
    addItemsVendor: (state, action) => {
      console.log("addItems action.payload:", action.payload);
      state[action.payload.vendor] = state[action.payload.vendor].concat(
        ...action.payload.items
      );
      // console.log(state.addedArray);
    },
  },
});

export const selectAllAdded = state => state.addedFORS.addedArray;

export const selectAllAddedNames = state =>
  state.added.addedArray.map(({ name }) => name);

export const testing = vendor => state => state.added[vendor];

export const selectVendorAdded = vendor => state =>
  state.added.addedArray.filter(e => e[vendor]);

export const { addItems, addItemsVendor } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
