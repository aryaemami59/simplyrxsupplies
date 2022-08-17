import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";

export const fetchItems = createAsyncThunk("Items/fetchItems", async () => {
  const response = await fetch(myURL, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3.raw.json",
      Authorization: "Bearer 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",
    },
  });
  if (!response.ok) {
    return Promise.reject("Unable to fetch, status: " + response.status);
  }
  const data = await response.json();
  const myItems = await data.items;
  return myItems;
});

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
  itemsArr: [],
  isLoading: true,
  errMsg: "",
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
  // extraReducers: {
  // },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (state, action) => {
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
    [fetchItems.pending]: state => {
      state.isLoading = true;
    },
    [fetchItems.fulfilled]: (state, action) => {
      for (const key of action.payload) {
        state[key.name] = key.vendors;
      }
      state.isLoading = false;
      state.errMsg = "";
      state.itemsArr = action.payload;
    },
    [fetchItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});
export const selectAllAdded = state => state.added;

export const selectByVendor = vendor => state => state.added[vendor];

export const addedItemsLength = vendor => state => state.added[vendor].length;

export const checkIfAddedToOneVendor = (itemObj, vendorName) => state =>
  state.item[itemObj.name].includes(vendorName);

export const selectItemsByVendor = vendor => state =>
  state.item.itemsArr.filter(e => e[vendor]);

export const selectVendorsToAddTo = itemObj => state =>
  state.item[itemObj.name];

export const selectSidebarNavs = category => state =>
  state.item.itemsArr.filter(({ nav }) => nav.includes(category));

export const selectByVendorItemNumbers = (vendor, char) => state =>
  state.added[vendor].map(({ itemNumber }) => itemNumber).join(char);

export const checkIfAddedToAllVendors = itemObj => state => {
  const arr = itemObj.vendors.filter(e => state.added[e].includes(itemObj))
    .length
    ? itemObj.vendors.filter(e => state.added[e].includes(itemObj))
    : empty;
  return itemObj.vendors.length === arr.length;
};

export const checkIfItemAdded = (vendor, itemObj) => state =>
  state.added[vendor].includes(itemObj) ? "bg-info text-white" : "";

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

// export const selectAllListItems = state => state.added.listItems;

export const selectAllListItems = createSelector(
  state => state.added.listItems,
  listItems => listItems
);

export const selectAllItems = state => state.item.itemsArr;

export const { setListItems, removeListItems } = addedSlice.actions;

export const { setVendors, testing } = itemSlice.actions;
