import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import QRCode from "qrcode";
import type {
  ItemName,
  VendorAndItemName,
  VendorNameType,
  Category,
} from "../custom_types/api";
import type { AddedState, FetchedData } from "../custom_types/redux";
import GITHUB_URL_ITEMS from "../data/fetchInfo";
import emptyArr from "../utils/emptyArr";
import emptyObj from "../utils/emptyObj";
import intersection from "../utils/intersection";

export const fetchItems = createAsyncThunk<FetchedData>(
  `items/fetchitems`,
  async () => {
    try {
      const response = await axios.get<FetchedData>(GITHUB_URL_ITEMS, {
        timeout: 1000,
      });
      return response.data;
    } catch (err) {
      throw axios.isAxiosError(err) ? err.message : "Unable to fetch";
    }
  }
);

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
    addItems: (state, { payload: itemName }: PayloadAction<ItemName>) => {
      if (
        !state.itemsObj[itemName].vendorsToAdd.length ||
        state.itemsObj[itemName].vendorsAdded.length ===
          state.itemsObj[itemName].vendors.length
      ) {
        return;
      }
      state.itemsObj[itemName].vendorsToAdd.forEach(vendorName => {
        if (
          !current(state.vendorsObj[vendorName]).itemsAdded.includes(itemName)
        ) {
          state.vendorsObj[vendorName].itemsAdded.push(itemName);
          const qr = state.vendorsObj[vendorName].itemsAdded
            .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
            .join(state.vendorsObj[vendorName].joinChars);
          QRCode.toDataURL(qr, (err, url) => {
            state.vendorsObj[vendorName].qrContent = url;
          });
          state.vendorsObj[vendorName].qrText = qr;
          state.listItems = state.listItems.filter(
            listItemName => listItemName !== itemName
          );
          state.itemsObj[itemName].vendorsAdded = [
            ...state.itemsObj[itemName].vendorsAdded,
            ...state.itemsObj[itemName].vendorsToAdd,
          ];
          state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
            .vendorsToAdd.length
            ? intersection(
                state.itemsObj[itemName].vendors,
                state.itemsObj[itemName].vendorsAdded
              )
            : emptyArr;
        }
      });
    },
    addItemsByVendor: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded.push(itemName);
      state.itemsObj[itemName].vendorsAdded = [
        ...state.itemsObj[itemName].vendorsAdded,
        vendorName,
      ];
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[itemName]
        .vendorsToAdd.length
        ? intersection(
            state.itemsObj[itemName].vendors,
            state.itemsObj[itemName].vendorsAdded
          )
        : emptyArr;
      const qr = state.vendorsObj[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
        .join(state.vendorsObj[vendorName].joinChars);
      QRCode.toDataURL(qr, (err, url) => {
        state.vendorsObj[vendorName].qrContent = url;
      });
      state.vendorsObj[vendorName].qrText = qr;
    },
    removeItems: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObj[vendorName].itemsAdded = state.vendorsObj[
        vendorName
      ].itemsAdded.filter(itemAddedName => itemAddedName !== itemName);
      state.itemsObj[itemName].vendorsAdded = state.itemsObj[
        itemName
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
      const qr = state.vendorsObj[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObj[itemAddedName].itemNumber)
        .join(state.vendorsObj[vendorName].joinChars);
      QRCode.toDataURL(qr, (err, url) => {
        state.vendorsObj[vendorName].qrContent = url;
      });
      state.vendorsObj[vendorName].qrText = qr;
    },
    setListItems: (state, action: PayloadAction<ItemName[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
        itemName
      ].vendorsToAdd.includes(action.payload.vendorName)
        ? state.itemsObj[itemName].vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemName].vendorsToAdd.concat(vendorName);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error.message ?? "Fetch failed";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const { categories, items, vendors } = action.payload;
      state.itemsArr = items.map(({ name }) => name);
      items.forEach(itemObj => {
        state.itemsObj[itemObj.name] = {
          ...itemObj,
          vendorsAdded: emptyArr,
          vendorsToAdd: itemObj.vendors,
        };
      });
      state.vendorsArr = Object.keys(vendors) as VendorNameType[];
      Object.values(vendors).forEach(vendorObj => {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemName[],
          qrContent: "",
          qrText: "",
        };
      });
      state.categoriesArr = Object.keys(categories) as Category[];
      state.categoriesObj = { ...categories };
      state.isLoading = false;
      state.errMsg = "";
    });
  },
});

export const {
  addItems,
  removeItems,
  addItemsByVendor,
  setListItems,
  clearListItems,
  setVendors,
} = addedSlice.actions;

export const addedReducer = addedSlice.reducer;
