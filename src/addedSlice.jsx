import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
  FETCH_CONFIG,
} from "../fetchInfo";

class Intersection {
  constructor(firstArray, secondArray) {
    this.firstArray = firstArray;
    this.secondArray = secondArray;
    return firstArray.filter(e => !secondArray.includes(e));
  }
}

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
      console.log(
        "vendorsAdded",
        current(state[action.payload.itemObj.name]).vendorsAdded
      );
      console.log(current(state[action.payload.itemObj.name]).vendorsToAdd);
      // const mySet = new Set(
      //   state[action.payload.itemObj.name].vendorsAdded.concat(
      //     state[action.payload.itemObj.name].vendorsToAdd
      //   )
      // );
      // console.log(mySet);
      // state[action.payload.itemObj.name].vendorsAdded = [...mySet];
      // mySet.add()
      state[action.payload.itemObj.name].vendorsAdded = [
        ...state[action.payload.itemObj.name].vendorsAdded,
        ...state[action.payload.itemObj.name].vendorsToAdd,
      ];
      state[action.payload.itemObj.name].vendorsToAdd = new Intersection(
        action.payload.itemObj.vendors,
        state[action.payload.itemObj.name].vendorsAdded
      );
      console.log(
        "vendorsAdded",
        current(state[action.payload.itemObj.name]).vendorsAdded
      );
      console.log(current(state[action.payload.itemObj.name]).vendorsToAdd);
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

export const checkIfAddedToAllVendors = itemObj => state =>
  state.item[itemObj.name].vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAdded = (vendorName, itemObj) => state =>
  state.item[itemObj.name].vendorsAdded.includes(vendorName)
    ? "bg-info text-white"
    : "";

export const selectAllItems = state => state.item.itemsArr;

export const selectAllListItems = createSelector(
  state => state.added.listItems,
  listItems => listItems
);

export const { addItems, removeItems, addItemsByVendor, changeVendors } =
  addedSlice.actions;

export const itemReducer = itemSlice.reducer;

export const addedReducer = addedSlice.reducer;

export const { setListItems, removeListItems } = addedSlice.actions;

export const { setVendors } = itemSlice.actions;
