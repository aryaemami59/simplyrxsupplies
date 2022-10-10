import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import QRCode from "qrcode";
import { createSelector } from "reselect";
import {
  AddedState,
  AddItemsByVendorInterface,
  AddItemsInterface,
  CategoriesObjType,
  Category,
  FetchItems,
  ItemObjType,
  Link,
  OfficialVendorNameType,
  VendorNameType,
} from "../customTypes/types";
import { GITHUB_URL_ITEMS } from "./fetchInfo";
import { RootState } from "./store";
import { ItemName } from "../customTypes/types";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) =>
  createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    return await response.json();
    // const myItems = await data[strVal];
    // return myItems;
  });

const emptyObj = {};
// emptyObj;

// export const fetchItems = createAsyncThunk();

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

// export const fetchVendors: FetchVendors = createAsyncThunkFunc(
//   "vendors",
//   GITHUB_URL_VENDORS
// );

// export const fetchCategories: FetchCategories = createAsyncThunkFunc(
//   "categories",
//   GITHUB_URL_CATEGORIES
// );

const emptyArr: [] = [];

const initialState = {
  listItems: emptyArr,
  // compact: false,
  // showItemNumber: true,
  // showItemBarcode: true,
  // showItemName: true,
  // vendorsIsLoading: true,
  // categoriesIsLoading: true,
  errMsg: "",
  isLoading: true,
  itemsArr: emptyArr,
  itemsObj: emptyObj,
  vendorsArr: emptyArr,
  vendorsObj: emptyObj,
  categoriesArr: emptyArr,
  categoriesObj: emptyObj,
} as unknown as AddedState;

// const itemInitialState: itemState = {
//   itemsArr: empty,
//   isLoading: true,
//   errMsg: "",
// };

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<AddItemsInterface>) => {
      action.payload.vendors.forEach((vendorName: VendorNameType) => {
        if (
          !current(state.vendorsObj[vendorName])!.itemsAdded!.includes(
            action.payload.itemObj
          )
        ) {
          state.vendorsObj[vendorName]!.itemsAdded!.push(
            action.payload.itemObj
          );
          const qr = state.vendorsObj[vendorName]!.itemsAdded!.map(
            ({ itemNumber }) => itemNumber
          ).join(state.vendorsObj![vendorName].joinChars);
          QRCode.toDataURL(qr, (err, url) => {
            state.vendorsObj[vendorName]!.qrContent = url;
          });
          state.vendorsObj[vendorName]!.qrText = qr;
          state.listItems = state.listItems.filter(
            ({ name }) => name !== action.payload.itemObj.name
          );
          state.itemsObj[action.payload.itemObj.name]!.vendorsAdded = [
            ...state.itemsObj[action.payload.itemObj.name]!.vendorsAdded,
            ...state.itemsObj[action.payload.itemObj.name]!.vendorsToAdd,
          ];
          state.itemsObj[action.payload.itemObj.name]!.vendorsToAdd = state
            .itemsObj[action.payload.itemObj.name]!.vendorsToAdd.length
            ? (intersection(
                action.payload.itemObj.vendors,
                state.itemsObj[action.payload.itemObj.name]!.vendorsAdded
              ) as VendorNameType[])
            : emptyArr;
        }
      });
    },
    addItemsByVendor: (
      state,
      action: PayloadAction<AddItemsByVendorInterface>
    ) => {
      const { itemObj, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded.push(itemObj);
      state.itemsObj[itemObj.name].vendorsAdded = [
        ...state.itemsObj[itemObj.name].vendorsAdded,
        vendorName,
      ];
      state.itemsObj[itemObj.name].vendorsToAdd = state.itemsObj[itemObj.name]
        .vendorsToAdd.length
        ? (intersection(
            itemObj.vendors,
            state.itemsObj[itemObj.name].vendorsAdded
          ) as VendorNameType[])
        : emptyArr;
    },
    removeItems: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemObj, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded = state.vendorsObj![
        vendorName
      ].itemsAdded.filter(({ id }) => id !== itemObj.id);
      state.itemsObj[itemObj.name]!.vendorsAdded = state.itemsObj[
        itemObj.name
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
    },
    setListItems: (state, action: PayloadAction<ItemObjType[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemObj, vendorName } = action.payload;
      state.itemsObj[itemObj.name]!.vendorsToAdd = state.itemsObj[
        itemObj.name
      ]!.vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemObj.name]!.vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemObj.name]!.vendorsToAdd.concat(vendorName);
    },
    // compactSearchResults: state => {
    //   state.compact = !state.compact;
    // },
    // ToggleItemNumber: state => {
    //   state.showItemNumber = !state.showItemNumber;
    // },
    // ToggleItemBarcode: state => {
    //   state.showItemBarcode = !state.showItemBarcode;
    // },
    // ToggleItemName: state => {
    //   state.showItemName = !state.showItemName;
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message || "Fetch failed";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const { categories, items, vendors } = action.payload;
      state.itemsArr = items.map(({ name }) => name);
      for (const itemObj of items) {
        state.itemsObj![itemObj.name] = {
          ...itemObj,
          vendorsAdded: emptyArr,
          vendorsToAdd: itemObj.vendors,
        };
      }
      state.vendorsArr = Object.keys(vendors) as VendorNameType[];
      for (const vendorObj of Object.values(vendors)) {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemObjType[],
          qrContent: "",
          qrText: "",
        };
      }
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      state.isLoading = false;
      state.errMsg = "";
    });
    // builder.addCase(fetchVendors.pending, state => {
    //   state.vendorsIsLoading = true;
    // });
    // builder.addCase(fetchCategories.pending, state => {
    //   state.categoriesIsLoading = true;
    // });
    // builder.addCase(
    //   fetchCategories.fulfilled,
    //   (state, action: PayloadAction<categoriesObjType>) => {
    //     state.categoriesObj = action.payload;
    //     const keys = Object.keys(action.payload) as Category[];
    //     state.categoriesArr = keys;
    //     state.categoriesIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(
    //   fetchVendors.fulfilled,
    //   (state, action: PayloadAction<vendorsObjType>) => {
    //     const payload: vendorsObjType = action.payload;
    //     const keys = Object.keys(payload) as vendorNameType[];
    //     state.vendorsArr = keys;
    //     state.vendorsObj = payload as vendorsObjType;
    //     let val: vendorNameType;
    //     for (val in payload) {
    //       state[val] = emptyVendorObj;
    //     }
    //     state.vendorsIsLoading = false;
    //     state.errMsg = "";
    //   }
    // );
    // builder.addCase(fetchVendors.rejected, (state, action) => {
    //   state.vendorsIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
    // builder.addCase(fetchCategories.rejected, (state, action) => {
    //   state.categoriesIsLoading = false;
    //   state.errMsg = action.error.message || "Fetch failed";
    // });
  },
});

// export const itemSlice = createSlice({
//   name: "item",
//   initialState: itemInitialState,
//   reducers: {
//     setVendors: (state, action: PayloadAction<addItemsByVendorInterface>) => {
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd.includes(action.payload.vendorName)
//         ? state[action.payload.itemObj.name]!.vendorsToAdd.filter(
//             vendorName => vendorName !== action.payload.vendorName
//           )
//         : state[action.payload.itemObj.name]!.vendorsToAdd.concat(
//             action.payload.vendorName
//           );
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(fetchItems.pending, (state: itemState) => {
//       state.isLoading = true;
//     });
//     builder.addCase(
//       fetchItems.fulfilled,
//       (state, action: PayloadAction<ItemObjType[]>) => {
//         for (const itemObj of action.payload) {
//           state[itemObj.name] = {
//             ...itemObj,
//             vendorsToAdd: itemObj.vendors,
//             vendorsAdded: empty,
//           };
//         }
//         state.isLoading = false;
//         state.errMsg = "";
//         state.itemsArr = action.payload;
//       }
//     );
//     builder.addCase(fetchItems.rejected, (state, action) => {
//       state.isLoading = false;
//       state.errMsg = action.error.message || "Fetch failed";
//     });
//     builder.addCase(addItems, (state, action) => {
//       state[action.payload.itemObj.name]!.vendorsAdded = [
//         ...state[action.payload.itemObj.name]!.vendorsAdded,
//         ...state[action.payload.itemObj.name]!.vendorsToAdd,
//       ];
//       state[action.payload.itemObj.name]!.vendorsToAdd = state[
//         action.payload.itemObj.name
//       ]!.vendorsToAdd.length
//         ? (intersection(
//             action.payload.itemObj.vendors,
//             state[action.payload.itemObj.name]!.vendorsAdded
//           ) as vendorNameType[])
//         : empty;
//     });
//     builder.addCase(
//       addItemsByVendor,
//       (state, action: PayloadAction<addItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = [
//           ...state[action.payload.itemObj.name]!.vendorsAdded,
//           action.payload.vendorName,
//         ];
//         state[action.payload.itemObj.name]!.vendorsToAdd = state[
//           action.payload.itemObj.name
//         ]!.vendorsToAdd.length
//           ? (intersection(
//               action.payload.itemObj.vendors,
//               state[action.payload.itemObj.name]!.vendorsAdded
//             ) as vendorNameType[])
//           : empty;
//       }
//     );
//     builder.addCase(
//       removeItems,
//       (state, action: PayloadAction<addItemsByVendorInterface>) => {
//         state[action.payload.itemObj.name]!.vendorsAdded = state[
//           action.payload.itemObj.name
//         ]!.vendorsAdded.filter(
//           vendorName => vendorName !== action.payload.vendorName
//         );
//       }
//     );
//   },
// });

export const selectByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj[vendorName]!.itemIds.map(
      e => Object.values(state.added.itemsObj).find(({ id }) => id === e)!
    );

export const selectVendorsArr = (state: RootState): VendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : emptyArr;

export const selectVendorsLinks =
  (vendorName: VendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName]!.link;

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr!;

export const addedItemsLength =
  (vendorName: VendorNameType) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName]!.itemsAdded!.length;

export const checkIfAddedToOneVendor =
  (itemObj: ItemObjType, vendorName: VendorNameType) =>
  (state: RootState): boolean =>
    state.added[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemObjType[] =>
    Object.values(state.added.itemsObj).filter(({ vendors }) =>
      vendors.includes(vendorName)
    );
// state.added.vendorsObj![vendorName].itemIds.map(
//   (itemId: number) =>
//     Object.values(state.added.itemsObj).find(({ id }) => id === itemId)!
// );

export const selectItemNamesByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    Object.values(state.added.itemsObj)
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectVendorsToAddTo =
  (itemObj: ItemObjType) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemObj.name]!.vendorsToAdd;

export const selectItemObjByName =
  (itemName: ItemName) =>
  (state: RootState): ItemObjType =>
    state.added.itemsObj[itemName];

export const selectCategories =
  (category: Category) =>
  (state: RootState): ItemObjType[] => {
    const categoriesObj = state.added.categoriesObj as CategoriesObjType;
    return categoriesObj[category].itemIds.map(
      itemId =>
        Object.values(state.added.itemsObj).find(({ id }) => id === itemId)!
    );
  };

export const selectQRCodeContent =
  (vendorName: VendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName]!.qrContent!;

export const numbersOnQR = (vendorName: VendorNameType) => (state: RootState) =>
  state.added.vendorsObj[vendorName]!.qrText!;

export const checkIfAddedToAllVendors =
  (itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemObj.name]!.vendorsAdded.length ===
    itemObj.vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorNameType, itemObj: ItemObjType) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemObj.name]!.vendorsAdded.includes(vendorName);

export const selectItemsArr = (state: RootState): ItemObjType[] =>
  Object.values(state.added.itemsObj);

export const selectVendorOfficialName =
  (vendorName: VendorNameType) =>
  (state: RootState): OfficialVendorNameType =>
    state.added.vendorsObj![vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): OfficialVendorNameType[] =>
  state.added.vendorsArr!.map(
    vendorName => state.added.vendorsObj![vendorName].officialName
  );

export const selectAllListItems = createSelector(
  (state: RootState): ItemObjType[] => state.added.listItems,
  (listItems: ItemObjType[]): ItemObjType[] => listItems
);

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  setVendors,
  // compactSearchResults,
  // ToggleItemNumber,
  // ToggleItemBarcode,
  // ToggleItemName,
} = addedSlice.actions;

// export const { setVendors } = itemSlice.actions;

// export const itemReducer: Reducer<itemState, AnyAction> = itemSlice.reducer;

export const addedReducer = addedSlice.reducer;
