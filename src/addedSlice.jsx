import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  McKesson: [],
  OrderInsite: [],
  GNFR: [],
  signOrderCatalog: [],
  vaxServe: [],
  medSurge: [],
  covap: [],
  FORS: [],
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action) => {
      console.log("addItems action.payload:", action.payload);
      action.payload.vendors.forEach(e => {
        state[e].push(action.payload.itemObj);
      });
      // state[action.payload.vendorName].push(action.payload.itemObj);
    },
  },
});

export const selectAllAdded = state => state.added.addedArray;

export const { addItems } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
