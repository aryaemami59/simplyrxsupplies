import {
  createSlice,
  current,
  createAsyncThunk,
  Reducer,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./data/store";
import {
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
  GITHUB_URL_NAVLIST,
} from "./data/fetchInfo";

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

// let jj: itemInterface[];

// const hh = async () => {
//   const response: Response = await fetch(GITHUB_URL_ITEMS);
//   const data = await response.json();
//   const myItems = await data.items;
//   jj = myItems;
//   console.log(jj);
//   return myItems;
// };

// hh();

export const fetchItems = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);
// console.log(fetchItems)

export const fetchVendors = createAsyncThunkFunc("vendors", GITHUB_URL_VENDORS);

export const fetchNavList = createAsyncThunkFunc("navs", GITHUB_URL_NAVLIST);

const empty: [] = [];

const vendors = [
  "MCK",
  "OI",
  "GNFR",
  "SOC",
  "VS",
  "MS",
  "COV",
  "FORS",
] as const;

export type itemInterface = {
  readonly [key in typeof vendors[number]]?: boolean;
} & {
  readonly id: number;
  readonly name: string;
  readonly itemNumber: string;
  readonly keywords: string[];
  // MCK?: boolean;
  // OI?: boolean;
  // GNFR?: boolean;
  // SOC?: boolean;
  // VS?: boolean;
  // MS?: boolean;
  // COV?: boolean;
  // FORS?: boolean;
  readonly nav: string[];
  // readonly vendors: string[];
  readonly vendors: typeof vendors[number][];
  readonly src: string;
  vendorsToAdd?: typeof vendors[number][] | [];
  vendorsAdded?: typeof vendors[number][] | [];
};

interface vendorInterface {
  id: number;
  officialName: string;
  abbrName: string;
  link: string;
  joinChars: string;
  items: itemInterface[];
}

type vendorsObjInterface = {
  [key in typeof vendors[number]]: vendorInterface;
};

interface navsObjInterface {
  [key: string]: itemInterface[];
}

interface addedState {
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
  navsObj?: navsObjInterface;
}

interface itemState {
  // Record<>
  // [key]: itemInterface;
  // [name: string]: itemInterface;
  itemsArr: itemInterface[];
  isLoading: boolean;
  errMsg: string;
}

// type VendorNameType = Pick<>

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

interface addItemsInterface {
  itemObj: itemInterface;
  vendors: string[];
}
// interface addItemsInterface {
//   payload: { itemObj: itemInterface; vendors: string[] };
//   type: string;
// }

interface addItemsByVendorInterface {
  itemObj: itemInterface;
  vendorName: string;
}
// interface addItemsByVendorInterface {
//   payload: { itemObj: itemInterface; vendorName: string };
//   type: string;
// }

// interface setListItemsInterface {
//   payload: itemInterface[];
//   type: string;
// }
// interface setListItemsInterface {
//   payload: itemInterface[];
//   type: string;
// }

// interface fetchNavListFulfilledInterface {
//   error: { message: string };
// }
// interface fetchNavListFulfilledInterface {
//   payload: navsObjInterface;
//   type: string;
//   error: { message: string };
// }

// interface fetchVendorsFulfilledInterface {
//   error: { message: string };
// }
// interface fetchVendorsFulfilledInterface {
//   payload: vendorsObjInterface;
//   type: string;
//   error: { message: string };
// }

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (
      state: addedState,
      action: PayloadAction<addItemsInterface>
    ): void => {
      action.payload.vendors.forEach((e: string): void => {
        if (!current(state[e]).includes(action.payload.itemObj)) {
          state[e].push(action.payload.itemObj);
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
        }
      });
    },
    addItemsByVendor: (
      state: addedState,
      action: PayloadAction<addItemsByVendorInterface>
    ): void => {
      state[action.payload.vendorName].push(action.payload.itemObj);
    },
    removeItems: (
      state: addedState,
      action: PayloadAction<addItemsByVendorInterface>
    ) => {
      state[action.payload.vendorName] = state[
        action.payload.vendorName
      ].filter(
        ({ name }: itemInterface) => name !== action.payload.itemObj.name
      );
    },
    setListItems: (
      state: addedState,
      action: PayloadAction<itemInterface[]>
    ): void => {
      state.listItems = action.payload;
    },
    clearListItems: (state: addedState): void => {
      state.listItems = empty;
    },
    compactSearchResults: (state: addedState): void => {
      state.compact = !state.compact;
    },
    ToggleItemNumber: (state: addedState): void => {
      state.showItemNumber = !state.showItemNumber;
    },
    ToggleItemBarcode: (state: addedState): void => {
      state.showItemBarcode = !state.showItemBarcode;
    },
    ToggleItemName: (state: addedState): void => {
      state.showItemName = !state.showItemName;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchVendors.pending, (state: addedState): void => {
      state.vendorsIsLoading = true;
    });
    builder.addCase(fetchNavList.pending, (state: addedState): void => {
      state.navListIsLoading = true;
    });
    builder.addCase(
      fetchNavList.fulfilled,
      (state: addedState, action: PayloadAction<navsObjInterface>): void => {
        state.navsObj = action.payload;
        state.navsArr = Object.keys(action.payload);
        state.navListIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(
      fetchVendors.fulfilled,
      (state: addedState, action: PayloadAction<vendorsObjInterface>): void => {
        state.vendorsArr = Object.keys(action.payload);
        state.vendorsObj = action.payload;
        for (const val in action.payload) {
          state[val] = empty;
        }
        state.vendorsIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(fetchVendors.rejected, (state: addedState, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchNavList.rejected, (state: addedState, action) => {
      state.navListIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    // [fetchVendors.pending.type]: (state: addedState): void => {
    //   state.vendorsIsLoading = true;
    // },
    // [fetchNavList.pending.type]: (state: addedState): void => {
    //   state.navListIsLoading = true;
    // },
    // [fetchNavList.fulfilled.type]: (
    //   state: addedState,
    //   action: PayloadAction<navsObjInterface>
    // ): void => {
    //   state.navsObj = action.payload;
    //   state.navsArr = Object.keys(action.payload);
    //   state.navListIsLoading = false;
    //   state.errMsg = "";
    // },
    // [fetchVendors.fulfilled.type]: (
    //   state: addedState,
    //   action: PayloadAction<vendorsObjInterface>
    // ) => {
    //   state.vendorsArr = Object.keys(action.payload);
    //   state.vendorsObj = action.payload;
    //   for (const val in action.payload) {
    //     state[val] = empty;
    //   }
    //   state.vendorsIsLoading = false;
    //   state.errMsg = "";
    // },
    // [fetchVendors.rejected.type]: (
    //   state: addedState,
    //   action: fetchVendorsFulfilledInterface
    // ) => {
    //   state.vendorsIsLoading = false;
    //   state.errMsg = action.error ? action.error.message : "Fetch failed";
    // },
    // [fetchNavList.rejected.type]: (
    //   state: addedState,
    //   action: fetchNavListFulfilledInterface
    // ) => {
    //   state.navListIsLoading = false;
    //   state.errMsg = action.error ? action.error.message : "Fetch failed";
    // },
  },
});

export const itemSlice = createSlice({
  name: "item",
  initialState: itemInitialState,
  reducers: {
    setVendors: (
      state: itemState,
      action: PayloadAction<addItemsByVendorInterface>
    ): void => {
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
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, (state: itemState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state: itemState, action: PayloadAction<itemInterface[]>): void => {
        for (const itemObj of action.payload) {
          state[itemObj.name] = {
            vendorsToAdd: itemObj.vendors,
            vendorsAdded: empty,
          };
        }
        state.isLoading = false;
        state.errMsg = "";
        state.itemsArr = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state: itemState, action): void => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(addItems, (state: itemState, action): void => {
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
    });
    builder.addCase(
      addItemsByVendor,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
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
      }
    );
    builder.addCase(
      removeItems,
      (state: itemState, action: PayloadAction<addItemsByVendorInterface>) => {
        state[action.payload.itemObj.name].vendorsAdded = state[
          action.payload.itemObj.name
        ].vendorsAdded.filter((e: string) => e !== action.payload.vendorName);
      }
    );
    // [fetchItems.pending.type]: (state: itemState) => {
    //   state.isLoading = true;
    // },
    // [fetchItems.fulfilled.type]: (
    //   state: itemState,
    //   action: PayloadAction<itemInterface[]>
    // ): void => {
    //   for (const itemObj of action.payload) {
    //     state[itemObj.name] = {
    //       vendorsToAdd: itemObj.vendors,
    //       vendorsAdded: empty,
    //     };
    //   }
    //   state.isLoading = false;
    //   state.errMsg = "";
    //   state.itemsArr = action.payload;
    // },
    // [fetchItems.rejected.type]: (
    //   state: itemState,
    //   action: fetchNavListFulfilledInterface
    // ): void => {
    //   state.isLoading = false;
    //   state.errMsg = action.error ? action.error.message : "Fetch failed";
    // },
    // "added/addItems": (
    //   state: itemState,
    //   action: PayloadAction<addItemsByVendorInterface>
    // ) => {
    //   state[action.payload.itemObj.name].vendorsAdded = [
    //     ...state[action.payload.itemObj.name].vendorsAdded,
    //     ...state[action.payload.itemObj.name].vendorsToAdd,
    //   ];
    //   state[action.payload.itemObj.name].vendorsToAdd = state[
    //     action.payload.itemObj.name
    //   ].vendorsToAdd.length
    //     ? intersection(
    //         action.payload.itemObj.vendors,
    //         state[action.payload.itemObj.name].vendorsAdded
    //       )
    //     : empty;
    // },
    // "added/addItemsByVendor": (
    //   state: itemState,
    //   action: PayloadAction<addItemsByVendorInterface>
    // ) => {
    //   state[action.payload.itemObj.name].vendorsAdded = [
    //     ...state[action.payload.itemObj.name].vendorsAdded,
    //     action.payload.vendorName,
    //   ];
    //   state[action.payload.itemObj.name].vendorsToAdd = state[
    //     action.payload.itemObj.name
    //   ].vendorsToAdd.length
    //     ? intersection(
    //         action.payload.itemObj.vendors,
    //         state[action.payload.itemObj.name].vendorsAdded
    //       )
    //     : empty;
    // },
    // "added/removeItems": (
    //   state: itemState,
    //   action: PayloadAction<addItemsByVendorInterface>
    // ) => {
    //   state[action.payload.itemObj.name].vendorsAdded = state[
    //     action.payload.itemObj.name
    //   ].vendorsAdded.filter((e: string) => e !== action.payload.vendorName);
    // },
  },
});

export const selectByVendor =
  (vendorName: string) =>
  (state: RootState): itemInterface[] =>
    state.added[vendorName];

export const selectVendorsArr = (state: RootState): string[] =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: string) =>
  (state: RootState): string =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectNavsArr = (state: RootState): string[] =>
  state.added.navsArr ? state.added.navsArr : empty;

export const addedItemsLength =
  (vendorName: string) =>
  (state: RootState): number =>
    state.added[vendorName].length;

export const checkIfAddedToOneVendor =
  (itemObj: itemInterface, vendorName: string) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: string) =>
  (state: RootState): itemInterface[] =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].items : empty;

export const selectVendorsToAddTo =
  (itemObj: itemInterface) =>
  (state: RootState): string[] =>
    state.item[itemObj.name].vendorsToAdd;

export const selectSidebarNavs =
  (category: string) =>
  (state: RootState): itemInterface[] =>
    state.added.navsObj ? state.added.navsObj[category] : empty;

export const selectQRCodeContent =
  (vendorName: string) =>
  (state: RootState): string =>
    state.added[vendorName]
      .map(({ itemNumber }) => itemNumber)
      .join(state.added.vendorsObj?.[vendorName].joinChars);

export const checkIfAddedToAllVendors =
  (itemObj: itemInterface) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.length === itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: string, itemObj: itemInterface) =>
  (state: RootState): boolean =>
    state.item[itemObj.name].vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): itemInterface[] =>
  state.item.itemsArr;

export const selectVendorOfficialName =
  (vendorName: string) =>
  (state: RootState): string =>
    state.added.vendorsObj![vendorName].officialName;

export const selectAllVendorOfficialNames = (state: RootState): string[] =>
  state.added.vendorsArr
    ? state.added.vendorsArr.map(
        (e: string) => state.added.vendorsObj![e].officialName
      )
    : empty;

export const selectAllListItems = createSelector(
  (state: RootState): itemInterface[] => state.added.listItems,
  (listItems: itemInterface[]): itemInterface[] => listItems
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

console.log(addedSlice);
