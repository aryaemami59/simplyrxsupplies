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
  Category,
  FetchItems,
  ItemName,
  ItemNumber,
  ItemObjType,
  Link,
  OfficialVendorNameType,
  Src,
  VendorNameType,
} from "../customTypes/types";
import { GITHUB_URL_ITEMS } from "./fetchInfo";
import { RootState } from "./store";

const intersection = (firstArray: string[], secondArray: string[]): string[] =>
  firstArray.filter(e => !secondArray.includes(e));

const createAsyncThunkFunc = (strVal: string, githubUrl: string) =>
  createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
    const response: Response = await fetch(githubUrl);
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    return await response.json();
  });

const emptyObj = {};

export const fetchItems: FetchItems = createAsyncThunkFunc(
  "items",
  GITHUB_URL_ITEMS
);

const emptyArr: [] = [];

const initialState = {
  listItems: emptyArr,
  errMsg: "",
  isLoading: true,
  itemsArr: emptyArr,
  itemsObj: emptyObj,
  vendorsArr: emptyArr,
  vendorsObj: emptyObj,
  categoriesArr: emptyArr,
  categoriesObj: emptyObj,
} as unknown as AddedState;

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<AddItemsInterface>) => {
      const { itemName, vendorsToAddTo } = action.payload;
      vendorsToAddTo.forEach((vendorName: VendorNameType) => {
        if (
          !current(state.vendorsObj[vendorName])!.itemsAdded!.includes(itemName)
        ) {
          state.vendorsObj[vendorName]!.itemsAdded!.push(itemName);
          const qr = state.vendorsObj[vendorName]!.itemsAdded!.map(
            itemAddedName => state.itemsObj[itemAddedName].itemNumber
          ).join(state.vendorsObj![vendorName].joinChars);
          QRCode.toDataURL(qr, (err, url) => {
            state.vendorsObj[vendorName]!.qrContent = url;
          });
          state.vendorsObj[vendorName]!.qrText = qr;
          state.listItems = state.listItems.filter(
            listItemName => listItemName !== itemName
          );
          state.itemsObj[itemName]!.vendorsAdded = [
            ...state.itemsObj[itemName]!.vendorsAdded,
            ...state.itemsObj[itemName]!.vendorsToAdd,
          ];
          state.itemsObj[itemName]!.vendorsToAdd = state.itemsObj[itemName]!
            .vendorsToAdd.length
            ? (intersection(
                state.itemsObj[itemName].vendors,
                state.itemsObj[itemName]!.vendorsAdded
              ) as VendorNameType[])
            : emptyArr;
        }
      });
    },
    addItemsByVendor: (
      state,
      action: PayloadAction<AddItemsByVendorInterface>
    ) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded.push(itemName);
      state.itemsObj[itemName].vendorsAdded = [
        ...state.itemsObj[itemName].vendorsAdded,
        vendorName,
      ];
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
        .vendorsToAdd.length
        ? (intersection(
            state.itemsObj[itemName].vendors,
            state.itemsObj[itemName].vendorsAdded
          ) as VendorNameType[])
        : emptyArr;
    },
    removeItems: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded = state.vendorsObj![
        vendorName
      ].itemsAdded.filter(itemAddedName => itemAddedName !== itemName);
      state.itemsObj[itemName]!.vendorsAdded = state.itemsObj[
        itemName
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
    },
    setListItems: (state, action: PayloadAction<ItemName[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<AddItemsByVendorInterface>) => {
      const { itemName, vendorName } = action.payload;
      state.itemsObj[itemName]!.vendorsToAdd = state.itemsObj[
        itemName
      ]!.vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemName]!.vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemName]!.vendorsToAdd.concat(vendorName);
    },
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
          itemsAdded: emptyArr as ItemName[],
          qrContent: "",
          qrText: "",
        };
      }
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      state.isLoading = false;
      state.errMsg = "";
    });
  },
});

export const selectByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemObjType[] =>
    state.added.vendorsObj[vendorName]!.itemIds.map(
      e => Object.values(state.added.itemsObj).find(({ id }) => id === e)!
    );

export const selectAddedItemsByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemName[] =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const selectVendorsArr = (state: RootState): VendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : emptyArr;

export const selectVendorsLinks =
  (vendorName: VendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName].link;

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr;

export const addedItemsLength =
  (vendorName: VendorNameType) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName].itemsAdded.length;

export const selectItemNamesByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    Object.values(state.added.itemsObj)
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectVendorsToAddTo =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName]!.vendorsToAdd;

export const selectItemObjByName =
  (itemName: ItemName) =>
  (state: RootState): ItemObjType =>
    state.added.itemsObj[itemName];

export const selectCategoriesItemNames =
  (categoryParam: Category) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObj)
      .filter(({ category }) => category.includes(categoryParam))
      .map(({ name }) => name);

export const selectItemNamesArr = (state: RootState): ItemName[] =>
  state.added.itemsArr;

export const selectQRCodeContent =
  (vendorName: VendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName].qrContent;

export const selectQRText =
  (vendorName: VendorNameType) => (state: RootState) =>
    state.added.vendorsObj[vendorName].qrText;

export const checkIfAddedToAllVendors =
  (itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.length ===
    state.added.itemsObj[itemName].vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName]!.vendorsAdded.includes(vendorName);

export const checkVendorsToAdd =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName]!.vendorsToAdd.includes(vendorName);

export const checkVendorsAdded =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName]!.vendorsAdded.includes(vendorName);

export const selectItemNumber =
  (itemName: ItemName) =>
  (state: RootState): ItemNumber =>
    state.added.itemsObj[itemName].itemNumber;

export const selectItemSrc =
  (itemName: ItemName) =>
  (state: RootState): Src =>
    state.added.itemsObj[itemName].src;

export const selectItemsArr = (state: RootState): ItemObjType[] =>
  Object.values(state.added.itemsObj);

export const selectVendorsByItemName =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName].vendors;

export const selectVendorOfficialName =
  (vendorName: VendorNameType) =>
  (state: RootState): OfficialVendorNameType =>
    state.added.vendorsObj[vendorName].officialName;

export const selectAllVendorOfficialNames = (
  state: RootState
): OfficialVendorNameType[] =>
  state.added.vendorsArr!.map(
    vendorName => state.added.vendorsObj![vendorName].officialName
  );

export const selectAllListItems = createSelector(
  (state: RootState): ItemName[] => state.added.listItems,
  (listItems: ItemName[]): ItemName[] => listItems
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
} = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
