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
      // state[action.payload.vendorName].push(action.payload.itemObj);
      action.payload.vendors.forEach(e => {
        // console.log(state[e].includes(action.payload.itemObj));
        // console.log(e);
        !state[e].includes(action.payload.itemObj) &&
          state[e].push(action.payload.itemObj);
      });
      // state[action.payload.vendorName].push(action.payload.itemObj);
    },
    removeItems: (state, action) => {
      console.log("removeItems action.payload:", action.payload);
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(e => e.name !== action.payload.itemObj.name);
    },
  },
});

export const selectAllAdded = state => state.added;

export const selectByVendor = vendor => state => state.added[vendor];

export const selectByMultipleVendors = vendors => state => {
  return vendors.map(e => {
    return state.added[e];
  });
};

// export const selectAllFORS = state => state.added.FORS;

export const { addItems, removeItems } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
