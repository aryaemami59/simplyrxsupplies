import {
  createSlice,
  current,
  createAsyncThunk,
  Reducer,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./store";
import { Category, Link, officialVendorNameType } from "../customTypes/types";
import {
  vendorNameType,
  navsObjInterface,
  vendorsObjInterface,
} from "../customTypes/types";
import {
  itemState,
  addItemsInterface,
  addItemsByVendorInterface,
  ItemObjType,
} from "../customTypes/types";
import {
  FetchItems,
  FetchVendors,
  FetchNavList,
  addedState,
} from "../customTypes/types";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
} from "./fetchInfo";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

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

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

export const fetchVendors: FetchVendors = createAsyncThunkFunc(
  "vendors",
  GITHUB_URL_VENDORS
);

export const fetchNavList: FetchNavList = createAsyncThunkFunc(
  "navs",
  GITHUB_URL_NAVLIST
);

const empty: [] = [];

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
    addItems: (state, action: PayloadAction<addItemsInterface>) => {
      action.payload.vendors.forEach((vendorName: vendorNameType) => {
        if (!current(state[vendorName])!.includes(action.payload.itemObj)) {
          state[vendorName]!.push(action.payload.itemObj);
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
        }
      });
    },
    addItemsByVendor: (
      state,
      action: PayloadAction<addItemsByVendorInterface>
    ) => {
      state[action.payload.vendorName]!.push(action.payload.itemObj);
    },
    removeItems: (state, action: PayloadAction<addItemsByVendorInterface>) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ]!.filter(
        ({ name }: ItemObjType) => name !== action.payload.itemObj.name
      );
    },
    setListItems: (state, action: PayloadAction<ItemObjType[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = empty;
    },
    compactSearchResults: state => {
      state.compact = !state.compact;
    },
    ToggleItemNumber: state => {
      state.showItemNumber = !state.showItemNumber;
    },
    ToggleItemBarcode: state => {
      state.showItemBarcode = !state.showItemBarcode;
    },
    ToggleItemName: state => {
      state.showItemName = !state.showItemName;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchVendors.pending, state => {
      state.vendorsIsLoading = true;
    });
    builder.addCase(fetchNavList.pending, state => {
      state.navListIsLoading = true;
    });
    builder.addCase(
      fetchNavList.fulfilled,
      (state, action: PayloadAction<navsObjInterface>) => {
        state.navsObj = action.payload;
        const keys = Object.keys(action.payload) as Category[];
        state.navsArr = keys;
        state.navListIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(
      fetchVendors.fulfilled,
      (state, action: PayloadAction<vendorsObjInterface>) => {
        const payload: vendorsObjInterface = action.payload;
        const keys = Object.keys(payload) as vendorNameType[];
        state.vendorsArr = keys;
        state.vendorsObj = payload as vendorsObjInterface;
        let val: vendorNameType;
        for (val in payload) {
          state[val] = empty;
        }
        state.vendorsIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchNavList.rejected, (state, action) => {
      state.navListIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (state, action: PayloadAction<addItemsByVendorInterface>) => {
      state[action.payload.itemObj.name]!.vendorsToAdd = state[
        action.payload.itemObj.name
      ]!.vendorsToAdd.includes(action.payload.vendorName)
        ? state[action.payload.itemObj.name]!.vendorsToAdd.filter(
            vendorName => vendorName !== action.payload.vendorName
          )
        : state[action.payload.itemObj.name]!.vendorsToAdd.concat(
            action.payload.vendorName
          );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, (state: itemState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<ItemObjType[]>) => {
        for (const itemObj of action.payload) {
          state[itemObj.name] = {
            ...itemObj,
            vendorsToAdd: itemObj.vendors,
            vendorsAdded: empty,
          };
        }
        state.isLoading = false;
        state.errMsg = "";
        state.itemsArr = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(addItems, (state, action) => {
      state[action.payload.itemObj.name]!.vendorsAdded = [
        ...state[action.payload.itemObj.name]!.vendorsAdded,
        ...state[action.payload.itemObj.name]!.vendorsToAdd,
      ];
      state[action.payload.itemObj.name]!.vendorsToAdd = state[
        action.payload.itemObj.name
      ]!.vendorsToAdd.length
        ? (intersection(
            action.payload.itemObj.vendors,
            state[action.payload.itemObj.name]!.vendorsAdded
          ) as vendorNameType[])
        : empty;
    });
    builder.addCase(
      addItemsByVendor,
      (state, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name]!.vendorsAdded = [
          ...state[action.payload.itemObj.name]!.vendorsAdded,
          action.payload.vendorName,
        ];
        state[action.payload.itemObj.name]!.vendorsToAdd = state[
          action.payload.itemObj.name
        ]!.vendorsToAdd.length
          ? (intersection(
              action.payload.itemObj.vendors,
              state[action.payload.itemObj.name]!.vendorsAdded
            ) as vendorNameType[])
          : empty;
      }
    );
    builder.addCase(
      removeItems,
      (state, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name]!.vendorsAdded = state[
          action.payload.itemObj.name
        ]!.vendorsAdded.filter(
          vendorName => vendorName !== action.payload.vendorName
        );
      }
    );
  },
});

export const selectByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added[vendorName]!;

export const selectVendorsArr = (state: RootState): vendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: vendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectNavsArr = (state: RootState): Category[] =>
  state.added.navsArr ? state.added.navsArr : empty;

export const addedItemsLength =
  (vendorName: vendorNameType) =>
  (state: RootState): number =>
    state.added[vendorName]!.length;

export const checkIfAddedToOneVendor =
  (itemObj: ItemObjType, vendorName: vendorNameType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: vendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj![vendorName].items.map(
      (e: number) => state.item.itemsArr.find((f: ItemObjType) => f.id === e)!
    );

export const selectVendorsToAddTo =
  (itemObj: ItemObjType) =>
  (state: RootState): vendorNameType[] =>
    state.item[itemObj.name]!.vendorsToAdd;

export const selectCategories =
  (category: Category) =>
  (state: RootState): ItemObjType[] =>
    state.added.navsObj![category].map(
      e => state.item.itemsArr.find(({ id }) => id === e)!
    );

export const selectQRCodeContent =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added[vendorName]!.map(({ itemNumber }) => itemNumber).join(
      state.added.vendorsObj?.[vendorName].joinChars
    );

export const checkIfAddedToAllVendors =
  (itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: vendorNameType, itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.item[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): ItemObjType[] =>
  state.item.itemsArr;

export const selectVendorOfficialName =
  (vendorName: vendorNameType) => (state: RootState) =>
    state.added.vendorsObj![vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): officialVendorNameType[] =>
  state.added.vendorsArr!.map(
    (vendorName: vendorNameType) =>
      state.added.vendorsObj![vendorName].officialName
  );

export const selectAllListItems = createSelector(
  (state: RootState): ItemObjType[] => state.added.listItems,
  (listItems: ItemObjType[]): ItemObjType[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.item.isLoading ||
  state.added.vendorsIsLoading ||
  state.added.navListIsLoading;

export const selectErrMsg = (state: RootState): string =>
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

export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer: Reducer<addedState, AnyAction> = addedSlice.reducer;
