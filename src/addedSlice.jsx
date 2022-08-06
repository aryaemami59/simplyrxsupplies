import { createSlice } from "@reduxjs/toolkit";
// import items from "./data/items.json";

const initialState = {
  // items,
  // McKesson: [],
  // OrderInsite: [],
  // GNFR: [],
  // signOrderCatalog: [],
  // vaxServe: [],
  // medSurge: [],
  // covap: [],
  // FORS: [],
  MCK: [],
  OI: [],
  GNFR: [],
  SOC: [],
  VS: [],
  MS: [],
  COV: [],
  FORS: [],
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action) => {
      // console.log(state)
      // console.log(action.payload.notAddedVendors.length);
      action.payload.notAddedVendors.length &&
        action.payload.notAddedVendors.forEach(e => {
          state[e].push(action.payload.itemObj);
        });
    },
    removeItems: (state, action) => {
      console.log("removeItems action.payload:", action.payload);
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(e => e.name !== action.payload.itemObj.name);
    },
  },
});

const empty = [];

export const selectAllAdded = state => state.added;

export const selectByVendor = vendor => state => state.added[vendor];

export const selectByVendorGetNames = vendor => state =>
  state.added[vendor].map(({ name }) => name);

export const selectByVendorsAdded = (vendors, itemObj) => state => {
  return vendors.filter(e => state.added[e].includes(itemObj)).length
    ? vendors.filter(e => state.added[e].includes(itemObj))
    : empty;
};

export const selectByVendorsNotAdded = (vendors, itemObj) => state => {
  return vendors.filter(e => !state.added[e].includes(itemObj)).length
    ? vendors.filter(e => !state.added[e].includes(itemObj))
    : empty;
};

export const { addItems, removeItems } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
