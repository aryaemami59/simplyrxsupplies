import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import QRCode from "qrcode";
import { createSelector } from "reselect";
import {
  addedState,
  addItemsByVendorInterface,
  addItemsInterface,
  categoriesObjType,
  Category,
  FetchCategories,
  FetchItems,
  FetchVendors,
  ItemObjType,
  itemState,
  Link,
  officialVendorNameType,
  vendorNameType,
  VendorsObjInAddedState,
  vendorsObjType,
} from "../customTypes/types";
import {
  GITHUB_URL_CATEGORIES,
  GITHUB_URL_ITEMS,
  GITHUB_URL_VENDORS,
} from "./fetchInfo";
import { RootState } from "./store";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) =>
  createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    const data = await response.json();
    const myItems = await data[strVal];
    return myItems;
  });

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

export const fetchVendors: FetchVendors = createAsyncThunkFunc(
  "vendors",
  GITHUB_URL_VENDORS
);

export const fetchCategories: FetchCategories = createAsyncThunkFunc(
  "categories",
  GITHUB_URL_CATEGORIES
);

const empty: [] = [];

const emptyVendorObj: VendorsObjInAddedState = {
  items: empty,
  qrContent: "",
  qrText: "",
};

const initialState: addedState = {
  listItems: empty,
  compact: false,
  showItemNumber: true,
  showItemBarcode: true,
  showItemName: true,
  vendorsIsLoading: true,
  categoriesIsLoading: true,
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
        if (
          !current(state[vendorName])!.items.includes(action.payload.itemObj)
        ) {
          state[vendorName]!.items.push(action.payload.itemObj);
          const qr = state[vendorName]!.items.map(
            ({ itemNumber }) => itemNumber
          ).join(state.vendorsObj![vendorName].joinChars);
          QRCode.toDataURL(qr, (err, url) => {
            state[vendorName]!.qrContent = url;
          });
          state[vendorName]!.qrText = qr;
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
      state[action.payload.vendorName]!.items.push(action.payload.itemObj);
    },
    removeItems: (state, action: PayloadAction<addItemsByVendorInterface>) => {
      state[action.payload.vendorName]!.items = state[
        action.payload.vendorName
      ]!.items.filter(
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
    builder.addCase(fetchCategories.pending, state => {
      state.categoriesIsLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<categoriesObjType>) => {
        state.categoriesObj = action.payload;
        const keys = Object.keys(action.payload) as Category[];
        state.categoriesArr = keys;
        state.categoriesIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(
      fetchVendors.fulfilled,
      (state, action: PayloadAction<vendorsObjType>) => {
        const payload: vendorsObjType = action.payload;
        const keys = Object.keys(payload) as vendorNameType[];
        state.vendorsArr = keys;
        state.vendorsObj = payload as vendorsObjType;
        let val: vendorNameType;
        for (val in payload) {
          state[val] = emptyVendorObj;
        }
        state.vendorsIsLoading = false;
        state.errMsg = "";
      }
    );
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.vendorsIsLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categoriesIsLoading = false;
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
    state.added[vendorName]!.items;

export const selectVendorsArr = (state: RootState): vendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : empty;

export const selectVendorsLinks =
  (vendorName: vendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr ? state.added.categoriesArr : empty;

export const addedItemsLength =
  (vendorName: vendorNameType) =>
  (state: RootState): number =>
    state.added[vendorName]!.items.length;

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
    state.added.categoriesObj![category].items.map(
      itemId => state.item.itemsArr.find(({ id }) => id === itemId)!
    );

export const selectQRCodeContent =
  (vendorName: vendorNameType) =>
  (state: RootState): string =>
    state.added[vendorName]!.qrContent;

export const numbersOnQR = (vendorName: vendorNameType) => (state: RootState) =>
  state.added[vendorName]!.qrText;

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

// export const qr = (state: RootState) => (vendorName: vendorNameType) =>
//   QRCode.toDataURL(QRCodeContent, (err, url) => {
//     setSrc(url);
//   });

export const selectAllListItems = createSelector(
  (state: RootState): ItemObjType[] => state.added.listItems,
  (listItems: ItemObjType[]): ItemObjType[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.item.isLoading ||
  state.added.vendorsIsLoading ||
  state.added.categoriesIsLoading;

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
