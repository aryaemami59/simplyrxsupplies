import { createSlice, current } from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";
import { createSelector } from "reselect";

const empty = [];

const initialState = {
  MCK: empty,
  OI: empty,
  GNFR: empty,
  SOC: empty,
  VS: empty,
  MS: empty,
  COV: empty,
  FORS: empty,
  listItems: empty,
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

export const selectByVendorsNotAdded = (vendors, itemObj) => state => {
  return vendors.filter(e => !state.added[e].includes(itemObj)).length
    ? vendors.filter(e => !state.added[e].includes(itemObj))
    : empty;
};

export const { addItems, removeItems, addItemsByVendor } = addedSlice.actions;

export const addedReducer = addedSlice.reducer;

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setListItems: (state, action) => {
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
);

export const { setListItems, removeListItems } = inputSlice.actions;

export const inputReducer = inputSlice.reducer;
