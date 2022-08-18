import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
  FETCH_CONFIG,
} from "../fetchInfo";

const createAsyncThunkFunc = (strVal, githubUrl) => {
  return createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response = await fetch(githubUrl, FETCH_CONFIG);
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    const myItems = await data[strVal];
    return myItems;
  });
};

export const fetchItems = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);

export const fetchVendors = createAsyncThunkFunc("vendors", GITHUB_URL_VENDORS);

export const fetchNavList = createAsyncThunkFunc("navs", GITHUB_URL_NAVLIST);

const empty = [];

const initialState = {
  listItems: empty,
  vendorsIsLoading: true,
  navListIsLoading: true,
  errMsg: "",
};

const itemInitialState = {
  itemsArr: empty,
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
  extraReducers: {
    [fetchVendors.pending]: state => {
      state.vendorsIsLoading = true;
    },
    [fetchNavList.pending]: state => {
      state.navListIsLoading = true;
    },
    [fetchVendors.fulfilled]: (state, action) => {
      state.vendorsObj = action.payload;
      state.vendorsArr = Object.keys(action.payload);
      for (const val in action.payload) {
        state[val] = empty;
      }
      state.vendorsIsLoading = false;
      state.errMsg = "";
    },
    [fetchNavList.fulfilled]: (state, action) => {
      state.navsObj = action.payload;
      state.navsArr = Object.keys(action.payload);
      state.navListIsLoading = false;
      state.errMsg = "";
    },
    [fetchVendors.rejected]: (state, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
    [fetchNavList.rejected]: (state, action) => {
      state.navListIsLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (state, action) => {
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.includes(action.payload.vendorName)
        ? state[action.payload.itemObj.name].vendorsToAdd.filter(
            e => e !== action.payload.vendorName
          )
        : state[action.payload.itemObj.name].vendorsToAdd.concat(
            action.payload.vendorName
          );
      //   state[action.payload.itemObj.name].vendorsToAdd = state[
      //     action.payload.itemObj.name
      //   ].vendorsAdded.includes(action.payload.vendorName)
      //     ? current(state[action.payload.itemObj.name].vendorsAdded).filter(
      //         e => e !== action.payload.vendorName
      //       )
      //     : current(state[action.payload.itemObj.name].vendorsToAdd).concat(
      //         action.payload.vendorName
      //       );
    },
  },
  extraReducers: {
    [fetchItems.pending]: state => {
      state.isLoading = true;
    },
    [fetchItems.fulfilled]: (state, action) => {
      for (const key of action.payload) {
        state[key.name] = { vendorsToAdd: key.vendors, vendorsAdded: empty };
      }
      state.isLoading = false;
      state.errMsg = "";
      state.itemsArr = action.payload;
      console.log(current(state));
    },
    [fetchItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
    "added/addItems": (state, action) => {
      console.log(current(state[action.payload.itemObj.name]).vendorsAdded);
      state[action.payload.itemObj.name].vendorsAdded = [
        ...state[action.payload.itemObj.name].vendorsAdded,
        ...state[action.payload.itemObj.name].vendorsToAdd,
      ];
      console.log(current(state[action.payload.itemObj.name]).vendorsAdded);
    },
  },
});

export const selectByVendor = vendorName => state => state.added[vendorName];

export const selectVendorsObj = state => state.added.vendorsObj;

export const selectVendorsArr = state => state.added.vendorsArr;

export const selectVendorsLinks = vendorName => state =>
  state.added.vendorsObj[vendorName].link;

export const selectNavsArr = state => state.added.navsArr;

export const selectNavsObj = state => state.added.navsObj;

export const addedItemsLength = vendor => state => state.added[vendor].length;

export const checkIfAddedToOneVendor = (itemObj, vendorName) => state =>
  state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsByVendor = vendorName => state =>
  state.added.vendorsObj[vendorName].items;

export const selectVendorsToAddTo = itemObj => state =>
  state.item[itemObj.name].vendorsToAdd;

export const selectSidebarNavs = category => state =>
  state.added.navsObj[category];

export const selectQRCodeContent = vendorName => state =>
  state.added[vendorName]
    .map(({ itemNumber }) => itemNumber)
    .join(state.added.vendorsObj[vendorName].joinChars);

export const checkIfAddedToAllVendors = itemObj => state => {
  // const arr = state.item[itemObj];
  // const arr = itemObj.vendors.filter(e => state.added[e].includes(itemObj))
  //   .length
  //   ? itemObj.vendors.filter(e => state.added[e].includes(itemObj))
  //   : empty;
  // return itemObj.vendors.length === arr.length;
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
