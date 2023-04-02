import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import QRCode from "qrcode";
import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { ItemName, VendorAndItemName, VendorName } from "../types/api";
import type { AddedState, FetchedData } from "../types/redux";
import difference from "../utils/difference";
import emptyArr from "../utils/emptyArr";
import emptyObj from "../utils/emptyObj";
import objectKeys from "../utils/objectKeys";

export const fetchItems = createAsyncThunk<FetchedData>(
  `items/fetchitems`,
  async () => {
    try {
      const response = await axios.get<FetchedData>(GITHUB_URL_ITEMS, {});
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
            ? difference(
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
        ? difference(
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
    removeAllItems: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      state.vendorsObj[vendorName].itemsAdded.forEach(itemName => {
        state.itemsObj[itemName].vendorsAdded = state.itemsObj[
          itemName
        ].vendorsAdded.filter(vendor => vendor !== vendorName);
        state.itemsObj[itemName].vendorsToAdd.includes(vendorName) ||
          state.itemsObj[itemName].vendorsToAdd.push(vendorName);
      });
      state.vendorsObj[vendorName].qrContent = "";
      state.vendorsObj[vendorName].qrText = "";
      state.vendorsObj[vendorName].itemsAdded = emptyArr;
    },
    setListItems: (state, action: PayloadAction<ItemName[]>) => {
      state.listItems = action.payload;
    },
    clearListItems: state => {
      state.listItems = emptyArr;
    },
    setVendors: (state, { payload }: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = payload;
      state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
        itemName
      ].vendorsToAdd.includes(vendorName)
        ? state.itemsObj[itemName].vendorsToAdd.filter(
            vendorNameParam => vendorNameParam !== vendorName
          )
        : state.itemsObj[itemName].vendorsToAdd.concat(vendorName);
    },
    minimizeItem: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      const { id } = state.itemsObj[itemName];
      state.vendorsObj[vendorName].minimizedItemIds = state.vendorsObj[
        vendorName
      ].minimizedItemIds.includes(id)
        ? state.vendorsObj[vendorName].minimizedItemIds.filter(e => e !== id)
        : state.vendorsObj[vendorName].minimizedItemIds.concat(id);
    },
    minimizeAll: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      const { itemsAdded, minimizedItemIds } = state.vendorsObj[vendorName];
      const itemsAddedIds = itemsAdded.map(e => state.itemsObj[e].id);
      state.vendorsObj[vendorName].minimizedItemIds = [
        ...minimizedItemIds,
        ...itemsAddedIds,
      ];
    },
    maximizeAll: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      state.vendorsObj[vendorName].minimizedItemIds = emptyArr;
    },
    setVendorsForAllCheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorName>
    ) => {
      Object.values(state.itemsObj)
        .filter(({ vendors }) => vendors.includes(vendorName))
        .forEach(({ name }) => {
          // vendorsToAdd.includes(vendorName) || vendorsToAdd.push(vendorName);
          // state.itemsObj[name].vendorsToAdd.includes(vendorName) ||
          //   state.itemsObj[name].vendorsToAdd.concat(vendorName);
          if (!state.itemsObj[name].vendorsToAdd.includes(vendorName)) {
            state.itemsObj[name].vendorsToAdd = [
              ...state.itemsObj[name].vendorsToAdd,
              vendorName,
            ];
          }
          // state.itemsObj[name].vendorsToAdd = state.itemsObj[
          //   name
          // ].vendorsToAdd.includes(vendorName)
          //   ? vendorsToAdd.filter(v => v !== vendorName)
          //   : [...vendorsToAdd, vendorName];
          // console.log(name, state.itemsObj[name]);
          // state.itemsObj[name].vendorsToAdd = state.itemsObj[
          //   name
          // ].vendorsToAdd.includes(vendorName)
          //   ? state.itemsObj[name].vendorsToAdd.filter(
          //       vendorNameParam => vendorNameParam !== vendorName
          //     )
          //   : state.itemsObj[name].vendorsToAdd.concat(vendorName);
        });
    },
    setVendorsForAllUncheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorName>
    ) => {
      state.itemsArr.forEach(itemName => {
        if (
          state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) ===
          state.itemsObj[itemName].vendorsToAdd.length - 1
        ) {
          state.itemsObj[itemName].vendorsToAdd.pop();
        } else if (
          state.itemsObj[itemName].vendorsToAdd.indexOf(vendorName) === 0
        ) {
          state.itemsObj[itemName].vendorsToAdd.shift();
        } else if (state.itemsObj[itemName].vendorsToAdd.includes(vendorName)) {
          state.itemsObj[itemName].vendorsToAdd = state.itemsObj[
            itemName
          ].vendorsToAdd.filter(vendor => vendor !== vendorName);
        }
      });
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
      state.vendorsArr = objectKeys(vendors);
      Object.values(vendors).forEach(vendorObj => {
        state.vendorsObj[vendorObj.abbrName] = {
          ...vendorObj,
          itemsAdded: emptyArr as ItemName[],
          minimizedItemIds: [],
          qrContent: "",
          qrText: "",
        };
      });
      state.categoriesArr = objectKeys(categories);
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
  removeAllItems,
  minimizeItem,
  minimizeAll,
  maximizeAll,
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} = addedSlice.actions;

// export const addedReducer = addedSlice.reducer;
export default addedSlice.reducer;
