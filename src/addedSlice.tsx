import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
} from "./data/fetchInfo";

interface IntersectionInterface {
  firstArray: string[];
  secondArray: string[];
}

// interface addedVendorInterface {

// }

class Intersection implements IntersectionInterface {
  firstArray: string[];
  secondArray: string[];

  constructor(firstArray: string[], secondArray: string[]) {
    this.firstArray = firstArray;
    this.secondArray = secondArray;
    this.fixArray();
  }
  fixArray() {
    return this.firstArray.filter((e) => !this.secondArray.includes(e));
  }
}

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter((e) => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) => {
  return createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    const myItems = await data[strVal];
    return myItems;
  });
};

export const fetchItems = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);
// console.log(fetchItems);
console.log(fetchItems.pending.type);
export interface stateInterface {
  added: addedState;
  item: itemState;
}

export const fetchVendors = createAsyncThunkFunc("vendors", GITHUB_URL_VENDORS);

export const fetchNavList = createAsyncThunkFunc("navs", GITHUB_URL_NAVLIST);

const empty: [] = [];

// let ven = ["MCK", "OI"] as const;
// type vendorName = typeof ven[number];

export interface itemInterface {
  id: number;
  name: string;
  itemNumber: string;
  keywords: string[];
  MCK?: boolean;
  OI?: boolean;
  GNFR?: boolean;
  SOC?: boolean;
  VS?: boolean;
  MS?: boolean;
  COV?: boolean;
  FORS?: boolean;
  nav: string[];
  vendors: string[];
  src: string;
}

interface vendorInterface {
  id: number;
  officialName: string;
  abbrName: string;
  // type vendorName = abbrName;
  link: string;
  joinChars: string;
  items: itemInterface[];
}

// type vendorName = Pick<vendorInterface, "abbrName">;
let vens;
if (vens) type vendorName = keyof typeof vens;

interface vendorsObjInterface {
  // [key: vendorInterface.abbrName]: vendorInterface;
  [MCK: vendorName]: vendorInterface;
  OI: vendorInterface;
  GNFR: vendorInterface;
  SOC: vendorInterface;
  VS: vendorInterface;
  MS: vendorInterface;
  COV: vendorInterface;
  FORS: vendorInterface;
}

interface addedState {
  // [vendorName: string]: any[];
  listItems: itemInterface[];
  compact: boolean;
  showItemNumber: boolean;
  showItemBarcode: boolean;
  showItemName: boolean;
  vendorsIsLoading: boolean;
  navListIsLoading: boolean;
  errMsg: string;
  vendorsArr?: string[];
  vendorsObj?: vendorsObjInterface;
  navsArr?: string[];
  navsObj?: { [key: string]: itemInterface[] };
}

interface itemState {
  itemsArr: itemInterface[];
  isLoading: boolean;
  errMsg: string;
}

const initialState: addedState = {
  listItems: empty,
  compact: false,
  showItemNumber: true,
  showItemBarcode: true,
  showItemName: true,
  vendorsIsLoading: true,
  navListIsLoading: true,
  errMsg: "",
};

const itemInitialState: itemState = {
  itemsArr: empty,
  isLoading: true,
  errMsg: "",
};

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state: addedState, action) => {
      action.payload.vendors.forEach((e: string) => {
        if (!current(state[e]).includes(action.payload.itemObj)) {
          state[e].push(action.payload.itemObj);
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
        }
      });
    },
    addItemsByVendor: (state: addedState, action) => {
      state[action.payload.vendorName].push(action.payload.itemObj);
    },
    removeItems: (state: addedState, action) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(({ name }) => name !== action.payload.itemObj.name);
    },
    setListItems: (state: addedState, action) => {
      // console.log("was".match(/\s*(was)/gi));
      console.log(
        /\s*(relion)*\s*(syringes)*/gi.test("relion insulin syringes")
      );
      // console.log(action.payload.split(/\s+/));
      state.listItems = action.payload;
    },
    clearListItems: (state: addedState) => {
      state.listItems = empty;
    },
    compactSearchResults: (state: addedState) => {
      state.compact = !state.compact;
    },
    ToggleItemNumber: (state) => {
      state.showItemNumber = !state.showItemNumber;
    },
    ToggleItemBarcode: (state) => {
      state.showItemBarcode = !state.showItemBarcode;
    },
    ToggleItemName: (state) => {
      state.showItemName = !state.showItemName;
    },
  },
  extraReducers: {
    [fetchVendors.pending.type]: (state) => {
      state.vendorsIsLoading = true;
    },
    [fetchNavList.pending.type]: (state) => {
      state.navListIsLoading = true;
    },
    [fetchNavList.fulfilled.type]: (state, action) => {
      state.navsObj = action.payload;
      state.navsArr = Object.keys(action.payload);
      state.navListIsLoading = false;
      state.errMsg = "";
    },
    [fetchVendors.fulfilled.type]: (
      state,
      action: { payload: vendorsObjInterface; type: string }
    ) => {
      state.vendorsArr = Object.keys(action.payload);
      // type keys = keyof typeof action.payload;
      // console.log(keyof typeof action.payload);
      // type vendorName = typeof jj[number];
      // const ll: keys = "MCK";
      // console.log(ll);
      // if (state.vendorsArr) vens = state.vendorsObj;
      state.vendorsObj = action.payload;
      for (const val in action.payload) {
        state[val] = empty;
      }
      state.vendorsIsLoading = false;
      state.errMsg = "";
    },
    [fetchVendors.rejected.type]: (state, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
    [fetchNavList.rejected.type]: (state, action) => {
      state.navListIsLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (
      state,
      action: {
        payload: { itemObj: itemInterface; vendorName: string };
        type: string;
      }
    ) => {
      console.log(action.payload);
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.includes(action.payload.vendorName)
        ? state[action.payload.itemObj.name].vendorsToAdd.filter(
            (e: string) => e !== action.payload.vendorName
          )
        : state[action.payload.itemObj.name].vendorsToAdd.concat(
            action.payload.vendorName
          );
    },
  },
  extraReducers: {
    [fetchItems.pending.type]: (state: itemState) => {
      state.isLoading = true;
    },
    [fetchItems.fulfilled.type]: (state: itemState, action: any) => {
      for (const key of action.payload) {
        state[key.name] = { vendorsToAdd: key.vendors, vendorsAdded: empty };
      }
      state.isLoading = false;
      state.errMsg = "";
      state.itemsArr = action.payload;
    },
    [fetchItems.rejected.type]: (state: itemState, action: any) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch failed";
    },
    "added/addItems": (state: itemState, action) => {
      state[action.payload.itemObj.name].vendorsAdded = [
        ...state[action.payload.itemObj.name].vendorsAdded,
        ...state[action.payload.itemObj.name].vendorsToAdd,
      ];
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.length
        ? intersection(
            action.payload.itemObj.vendors,
            state[action.payload.itemObj.name].vendorsAdded
          )
        : empty;
    },
    "added/addItemsByVendor": (state: itemState, action) => {
      state[action.payload.itemObj.name].vendorsAdded = [
        ...state[action.payload.itemObj.name].vendorsAdded,
        action.payload.vendorName,
      ];
      state[action.payload.itemObj.name].vendorsToAdd = state[
        action.payload.itemObj.name
      ].vendorsToAdd.length
        ? intersection(
            action.payload.itemObj.vendors,
            state[action.payload.itemObj.name].vendorsAdded
          )
        : empty;
    },
    "added/removeItems": (state: itemState, action) => {
      state[action.payload.itemObj.name].vendorsAdded = state[
        action.payload.itemObj.name
      ].vendorsAdded.filter((e: string) => e !== action.payload.vendorName);
    },
  },
});

export const selectByVendor = (vendorName: string) => (state: stateInterface) =>
  state.added[vendorName];

export const selectVendorsArr = (state: stateInterface) =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: string) => (state: stateInterface) =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectNavsArr = (state: stateInterface) =>
  state.added.navsArr ? state.added.navsArr : empty;

export const addedItemsLength =
  (vendorName: string) =>
  (state: stateInterface): number =>
    state.added[vendorName].length;

export const checkIfAddedToOneVendor =
  (itemObj: itemInterface, vendorName: string) =>
  (state: stateInterface): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: string) => (state: stateInterface) =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].items : empty;

export const selectVendorsToAddTo =
  (itemObj: itemInterface) => (state: stateInterface) =>
    state.item[itemObj.name].vendorsToAdd;

export const selectSidebarNavs =
  (category: string) => (state: stateInterface) =>
    state.added.navsObj ? state.added.navsObj[category] : empty;

export const selectQRCodeContent =
  (vendorName: string) => (state: stateInterface) =>
    state.added[vendorName]
      .map(({ itemNumber }) => itemNumber)
      .join(state.added.vendorsObj?.[vendorName].joinChars);

export const checkIfAddedToAllVendors =
  (itemObj: itemInterface) => (state: stateInterface) =>
    state.item[itemObj.name].vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: string, itemObj: itemInterface) =>
  (state: stateInterface): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: stateInterface) => state.item.itemsArr;

export const selectVendorOfficialName =
  (vendorName: string) =>
  (state: stateInterface): string =>
    state.added.vendorsObj
      ? state.added.vendorsObj[vendorName].officialName
      : "";

export const selectAllVendorOfficialNames = (state: stateInterface) =>
  state.added.vendorsArr
    ? state.added.vendorsArr.map((e) =>
        state.added.vendorsObj ? state.added.vendorsObj[e].officialName : ""
      )
    : empty;

export const selectAllListItems = createSelector(
  (state: stateInterface) => state.added.listItems,
  (listItems) => listItems
);

export const checkIfLoading = (state: stateInterface) =>
  state.item.isLoading ||
  state.added.vendorsIsLoading ||
  state.added.navListIsLoading;

export const selectErrMsg = (state: stateInterface) =>
  state.item.errMsg || state.added.errMsg;

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  compactSearchResults,
  ToggleItemNumber,
  ToggleItemBarcode,
  ToggleItemName,
} = addedSlice.actions;

export const { setVendors } = itemSlice.actions;

export const itemReducer = itemSlice.reducer;

export const addedReducer = addedSlice.reducer;
