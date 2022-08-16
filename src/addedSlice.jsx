import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import { createSelector } from "reselect";
import myItems from "./data/items.json";

// const myURL =
//   "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";
// const { isLoading, error, data, status } = useQuery(["items"], fetchItems);

// export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
//   const response = await fetch(myURL);
//   if (!response.ok) {
//     return Promise.reject("Unable to fetch, status: " + response.status);
//   }
//   const data = await response.json();
//   return data;
// });

// fetchItems.fulfilled && console.log(fetchItems.fulfilled);

const items = {};
for (const key of myItems.items) {
  items[key.name] = key.vendors;
}

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

const itemInitialState = {
  ...items,
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action) => {
      action.payload.vendors.forEach(e => {
        if (!current(state[e]).includes(action.payload.itemObj)) {
          state[e].push(action.payload.itemObj);
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
        }
      });
      // action.payload.vendors.forEach(e => {
      //   if (!current(state[e]).includes(action.payload.itemObj)) {
      //     state[e].push(action.payload.itemObj);
      //     state.listItems = state.listItems.filter(
      //       ({ name }) => name !== action.payload.itemObj.name
      //     );
      //   }
      // });
    },
    addItemsByVendor: (state, action) => {
      state[action.payload.vendorName].push(state.action.payload.itemObj);
    },
    removeItems: (state, action) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(({ name }) => name !== action.payload.itemObj.name);
    },
    setListItems: (state, action) => {
      state.listItems = action.payload;
    },
  },
  extraReducers: {
    // "item/setVendors": (state, action) => {
    //   state.vendorsToAdd = action.payload.itemObj.vendors.filter(
    //     e => e !== action.payload.vendorName
    //   );
    // },
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (state, action) => {
      console.log(current(state[action.payload.itemObj.name]));
      // if (current(state[action.payload.itemObj.name]) !== empty) {
      state[action.payload.itemObj.name] = state[
        action.payload.itemObj.name
      ].includes(action.payload.vendorName)
        ? current(state[action.payload.itemObj.name]).filter(
            e => e !== action.payload.vendorName
          )
        : current(state[action.payload.itemObj.name]).concat(
            action.payload.vendorName
          );
      // }
    },
  },
  extraReducers: {
    // "added/addItems": (state, action) => {
    //   state[action.payload.itemObj.name] = state[
    //     action.payload.itemObj.name
    //   ].filter(e => !action.payload.vendors.includes(e)).length
    //     ? state[action.payload.itemObj.name].filter(
    //         e => !action.payload.vendors.includes(e)
    //       )
    //     : empty;
    // },
    // "added/removeItems": (state, action) => {
    //   console.log(state.items);
    //   state[action.payload.itemObj.name].push(action.payload.vendorName);
    // },
  },
});
export const selectAllAdded = state => state.added;

export const selectByVendor = vendor => state => state.added[vendor];

export const addedItemsLength = vendor => state => state.added[vendor].length;

export const selectByVendorItemNumbers = (vendor, char) => state =>
  state.added[vendor].map(({ itemNumber }) => itemNumber).join(char);

export const checkIfAddedToAllVendors = itemObj => state => {
  // console.log(itemObj.vendors.filter(e => state.added[e].includes(itemObj)));
  const arr = itemObj.vendors.filter(e => state.added[e].includes(itemObj))
    .length
    ? itemObj.vendors.filter(e => state.added[e].includes(itemObj))
    : empty;
  return itemObj.vendors.length === arr.length;
};

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

export const { addItems, removeItems, addItemsByVendor, changeVendors } =
  addedSlice.actions;

export const itemReducer = itemSlice.reducer;

export const addedReducer = addedSlice.reducer;

export const selectAllListItems = createSelector(
  state => state.added.listItems,
  listItems => listItems
);

export const { setListItems, removeListItems } = addedSlice.actions;

export const { setVendors, testing } = itemSlice.actions;
