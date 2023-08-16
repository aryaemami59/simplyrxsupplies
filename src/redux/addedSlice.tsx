import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, current } from "@reduxjs/toolkit";
import QRCode from "qrcode";

import type { VendorAndItemName, VendorName } from "../types/api";
import type { AddedState } from "../types/redux";
import difference from "../utils/difference";
import emptyArray from "../utils/emptyArray";
import emptyObject from "../utils/emptyObject";
import objectKeys from "../utils/objectKeys";
import { apiSlice } from "./apiSlice";

// export const fetchItems = createAsyncThunk<FetchedData>(
//   `items/fetchitems`,
//   async () => {
//     try {
//       const response = await axios.get<FetchedData>(GITHUB_URL_ITEMS, {});
//       return response.data;
//     } catch (error) {
//       throw axios.isAxiosError(error)
//         ? new Error(error.message)
//         : new Error("Unable to fetch");
//     }
//   }
// );

// export const addedAdapter = createEntityAdapter<Supplies>();
// console.log(addedAdapter.getInitialState());

const initialState: AddedState = {
  searchResultsItemNames: emptyArray,
  // errorMessage: "",
  // isLoading: true,
  itemsArray: emptyArray,
  itemsObject: emptyObject,
  vendorsArray: emptyArray,
  vendorsObject: emptyObject,
  categoriesArray: emptyArray,
  categoriesObject: emptyObject,
} as unknown as AddedState satisfies AddedState;

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItems: (state, { payload: itemName }: PayloadAction<string>) => {
      if (
        state.itemsObject[itemName].vendorsToAdd.length === 0 ||
        state.itemsObject[itemName].vendorsAdded.length ===
          state.itemsObject[itemName].vendors.length
      ) {
        return;
      }
      state.itemsObject[itemName].vendorsToAdd.forEach(vendorName => {
        if (
          !current(state.vendorsObject[vendorName]).itemsAdded.includes(
            itemName
          )
        ) {
          state.vendorsObject[vendorName].itemsAdded.push(itemName);
          const qr = state.vendorsObject[vendorName].itemsAdded
            .map(itemAddedName => state.itemsObject[itemAddedName].itemNumber)
            .join(state.vendorsObject[vendorName].joinChars);
          QRCode.toDataURL(qr, (error, url) => {
            state.vendorsObject[vendorName].qrContent = url;
          });
          state.vendorsObject[vendorName].qrText = qr;
          state.searchResultsItemNames = state.searchResultsItemNames.filter(
            listItemName => listItemName !== itemName
          );
          state.itemsObject[itemName].vendorsAdded = [
            ...state.itemsObject[itemName].vendorsAdded,
            ...state.itemsObject[itemName].vendorsToAdd,
          ];
          state.itemsObject[itemName].vendorsToAdd =
            state.itemsObject[itemName].vendorsToAdd.length > 0
              ? difference(
                  state.itemsObject[itemName].vendors,
                  state.itemsObject[itemName].vendorsAdded
                )
              : emptyArray;
        }
      });
    },
    addItemsByVendor: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObject[vendorName].itemsAdded.push(itemName);
      state.itemsObject[itemName].vendorsAdded = [
        ...state.itemsObject[itemName].vendorsAdded,
        vendorName,
      ];
      state.itemsObject[itemName].vendorsToAdd =
        state.itemsObject[itemName].vendorsToAdd.length > 0
          ? difference(
              state.itemsObject[itemName].vendors,
              state.itemsObject[itemName].vendorsAdded
            )
          : emptyArray;
      const qr = state.vendorsObject[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObject[itemAddedName].itemNumber)
        .join(state.vendorsObject[vendorName].joinChars);
      QRCode.toDataURL(qr, (error, url) => {
        state.vendorsObject[vendorName].qrContent = url;
      });
      state.vendorsObject[vendorName].qrText = qr;
    },
    removeItems: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObject[vendorName].itemsAdded = state.vendorsObject[
        vendorName
      ].itemsAdded.filter(itemAddedName => itemAddedName !== itemName);
      state.itemsObject[itemName].vendorsAdded = state.itemsObject[
        itemName
      ].vendorsAdded.filter(vendor => vendor !== vendorName);
      const qr = state.vendorsObject[vendorName].itemsAdded
        .map(itemAddedName => state.itemsObject[itemAddedName].itemNumber)
        .join(state.vendorsObject[vendorName].joinChars);
      QRCode.toDataURL(qr, (error, url) => {
        state.vendorsObject[vendorName].qrContent = url;
      });
      state.vendorsObject[vendorName].qrText = qr;
    },
    removeAllItems: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      state.vendorsObject[vendorName].itemsAdded.forEach(itemName => {
        state.itemsObject[itemName].vendorsAdded = state.itemsObject[
          itemName
        ].vendorsAdded.filter(vendor => vendor !== vendorName);
        if (!state.itemsObject[itemName].vendorsToAdd.includes(vendorName)) {
          state.itemsObject[itemName].vendorsToAdd.push(vendorName);
        }
      });
      state.vendorsObject[vendorName].qrContent = "";
      state.vendorsObject[vendorName].qrText = "";
      state.vendorsObject[vendorName].itemsAdded = emptyArray;
    },
    setListItems: (state, action: PayloadAction<string[]>) => {
      state.searchResultsItemNames = action.payload;
    },
    clearListItems: state => {
      state.searchResultsItemNames = emptyArray;
    },
    setVendors: (state, { payload }: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = payload;
      state.itemsObject[itemName].vendorsToAdd = state.itemsObject[
        itemName
      ].vendorsToAdd.includes(vendorName)
        ? state.itemsObject[itemName].vendorsToAdd.filter(
            vendorNameParameter => vendorNameParameter !== vendorName
          )
        : state.itemsObject[itemName].vendorsToAdd.concat(vendorName);
    },
    minimizeItem: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      const { id } = state.itemsObject[itemName];
      state.vendorsObject[vendorName].minimizedItemIds = state.vendorsObject[
        vendorName
      ].minimizedItemIds.includes(id)
        ? state.vendorsObject[vendorName].minimizedItemIds.filter(
            minimizedItemId => minimizedItemId !== id
          )
        : state.vendorsObject[vendorName].minimizedItemIds.concat(id);
    },
    minimizeAll: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      const { itemsAdded, minimizedItemIds } = state.vendorsObject[vendorName];
      const itemsAddedIds = itemsAdded.map(item => state.itemsObject[item].id);
      state.vendorsObject[vendorName].minimizedItemIds = [
        ...minimizedItemIds,
        ...itemsAddedIds,
      ];
    },
    maximizeAll: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      state.vendorsObject[vendorName].minimizedItemIds = emptyArray;
    },
    setVendorsForAllCheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorName>
    ) => {
      Object.values(state.itemsObject)
        .filter(({ vendors }) => vendors.includes(vendorName))
        .forEach(({ name }) => {
          if (!state.itemsObject[name].vendorsToAdd.includes(vendorName)) {
            state.itemsObject[name].vendorsToAdd = [
              ...state.itemsObject[name].vendorsToAdd,
              vendorName,
            ];
          }
        });
    },
    setVendorsForAllUncheck: (
      state,
      { payload: vendorName }: PayloadAction<VendorName>
    ) => {
      state.itemsArray.forEach(itemName => {
        if (
          state.itemsObject[itemName].vendorsToAdd.indexOf(vendorName) ===
          state.itemsObject[itemName].vendorsToAdd.length - 1
        ) {
          state.itemsObject[itemName].vendorsToAdd.pop();
        } else if (
          state.itemsObject[itemName].vendorsToAdd.indexOf(vendorName) === 0
        ) {
          state.itemsObject[itemName].vendorsToAdd.shift();
        } else if (
          state.itemsObject[itemName].vendorsToAdd.includes(vendorName)
        ) {
          state.itemsObject[itemName].vendorsToAdd = state.itemsObject[
            itemName
          ].vendorsToAdd.filter(vendor => vendor !== vendorName);
        }
      });
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchItems.pending, state => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchItems.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.errorMessage = action.error.message ?? "Fetch failed";
    // });
    // builder.addCase(fetchItems.fulfilled, (state, action) => {
    //   const { categories, items, vendors } = action.payload;
    //   state.itemsArray = items.map(({ name }) => name);
    //   items.forEach(itemObject => {
    //     state.itemsObject[itemObject.name] = {
    //       ...itemObject,
    //       vendorsAdded: emptyArray,
    //       vendorsToAdd: itemObject.vendors,
    //     };
    //   });
    //   state.vendorsArray = objectKeys(vendors);
    //   Object.values(vendors).forEach(vendorObject => {
    //     state.vendorsObject[vendorObject.abbrName] = {
    //       ...vendorObject,
    //       itemsAdded: emptyArray as ItemName[],
    //       minimizedItemIds: [],
    //       qrContent: "",
    //       qrText: "",
    //     };
    //   });
    //   state.categoriesArray = objectKeys(categories);
    //   state.categoriesObject = { ...categories };
    //   state.isLoading = false;
    //   state.errorMessage = "";
    // });
    builder.addMatcher(
      apiSlice.endpoints.getMain.matchFulfilled,
      (state, action) => {
        const { categories, items, vendors } = action.payload;
        state.itemsArray = items.map(({ name }) => name);
        items.forEach(itemObject => {
          state.itemsObject[itemObject.name] = {
            ...itemObject,
            vendorsAdded: emptyArray,
            vendorsToAdd: itemObject.vendors,
          };
        });
        state.vendorsArray = objectKeys(vendors);
        Object.values(vendors).forEach(vendorObject => {
          state.vendorsObject[vendorObject.abbrName] = {
            ...vendorObject,
            itemsAdded: emptyArray as string[],
            minimizedItemIds: [],
            qrContent: "",
            qrText: "",
          };
        });
        state.categoriesArray = objectKeys(categories);
        state.categoriesObject = { ...categories };
        // state.isLoading = false;
        // state.errorMessage = "";
      }
    );
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

export default addedSlice.reducer;
