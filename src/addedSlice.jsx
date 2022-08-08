import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
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
      // action.payload.notAddedVendors.length &&
      //   action.payload.notAddedVendors.forEach(e => {
      //     state[e].push(action.payload.itemObj);
      //   });
      action.payload.vendors.forEach(e => {
        !current(state[e]).includes(action.payload) &&
          state[e].push(action.payload);
      });
    },
    addItemsByVendor: (state, action) => {
      state[action.payload.vendorName].push(state.action.payload.itemObj);
    },
    removeItems: (state, action) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(e => e.name !== action.payload.itemObj.name);
    },
  },
});

const empty = [];

export const selectAllAdded = state => state.added;

export const selectByVendor = vendor => state => state.added[vendor];

export const checkIfItemAdded = (vendor, itemObj) => state =>
  state.added[vendor].includes(itemObj);

export const selectByVendorGetNames = vendor => state =>
  state.added[vendor].map(({ name }) => name);

export const selectByVendorsAdded = (vendors, itemObj) => state => {
  return vendors.filter(e => state.added[e].includes(itemObj)).length
    ? vendors.filter(e => state.added[e].includes(itemObj))
    : empty;
};

// export const checkIfSameArray = (e) => (state) => ;

export const selectByVendorsNotAdded = (vendors, itemObj) => state => {
  return vendors.filter(e => !state.added[e].includes(itemObj)).length
    ? vendors.filter(e => !state.added[e].includes(itemObj))
    : empty;
};

export const { addItems, removeItems, addItemsByVendor } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
