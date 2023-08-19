import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import QRCode from "qrcode";

import type { VendorAndItemName, VendorName } from "../types/api";
import type { AddedState } from "../types/redux";
import difference from "../utils/difference";
import emptyArray from "../utils/emptyArray";
import emptyObject from "../utils/emptyObject";
import objectKeys from "../utils/objectKeys";
import { apiSlice } from "./apiSlice";
import {
  selectFilteredItemsAdded,
  selectFilteredSearchResultsItemNames,
  selectFilteredVendorsAdded,
  selectItem,
  selectItemsAdded,
  selectQRContent,
  selectVendors,
  selectVendorsToAdd,
} from "./draftSafeSelectors";

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

export const initialState: AddedState = {
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
      const item = selectItem(state, itemName);
      const { vendorsAdded, vendorsToAdd, vendors } = item;
      // const vendorsToAdd = selectVendorsToAdd(state, itemName);
      // const vendorsAdded = selectVendorsAdded(state, itemName);
      if (vendorsToAdd.length === 0 || vendorsAdded.length === vendors.length) {
        return;
      }
      vendorsToAdd.forEach(vendorName => {
        const itemsAdded = selectItemsAdded(state, vendorName);
        // const vendorsObject = topLevelSelectors.selectVendorsObject(state);
        // console.log(vendorsObject);
        // const vendorsObject = selectVendor(state, vendorName);
        if (!itemsAdded.includes(itemName)) {
          state.vendorsObject[vendorName].itemsAdded.push(itemName);
          const qr = selectQRContent(state, vendorName);
          // const qr = state.vendorsObject[vendorName].itemsAdded
          //   .map(itemAddedName => state.itemsObject[itemAddedName].itemNumber)
          //   .join(state.vendorsObject[vendorName].joinChars);
          QRCode.toDataURL(qr, (error, url) => {
            state.vendorsObject[vendorName].qrContent = url;
          });
          state.vendorsObject[vendorName].qrText = qr;
          state.searchResultsItemNames = selectFilteredSearchResultsItemNames(
            state,
            itemName
          );
          state.itemsObject[itemName].vendorsAdded = [
            ...vendorsAdded,
            ...vendorsToAdd,
          ];
          state.itemsObject[itemName].vendorsToAdd =
            vendorsToAdd.length > 0
              ? difference(vendors, vendorsAdded)
              : emptyArray;
        }
      });
    },
    addItemsByVendor: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObject[vendorName].itemsAdded.push(itemName);
      const item = selectItem(state, itemName);
      const vendorsAdded = selectFilteredVendorsAdded(
        state,
        itemName,
        vendorName
      );
      const vendorsToAdd = selectVendorsToAdd(state, itemName);
      const vendors = selectVendors(state, itemName);
      state.itemsObject[itemName].vendorsAdded = [...vendorsAdded, vendorName];
      state.itemsObject[itemName].vendorsToAdd =
        vendorsToAdd.length > 0
          ? difference(vendors, vendorsAdded)
          : emptyArray;
      const qr = selectQRContent(state, vendorName);
      // const qr = state.vendorsObject[vendorName].itemsAdded
      //   .map(itemAddedName => state.itemsObject[itemAddedName].itemNumber)
      //   .join(state.vendorsObject[vendorName].joinChars);
      QRCode.toDataURL(qr, (error, url) => {
        state.vendorsObject[vendorName].qrContent = url;
      });
      state.vendorsObject[vendorName].qrText = qr;
    },
    removeItems: (state, action: PayloadAction<VendorAndItemName>) => {
      const { itemName, vendorName } = action.payload;
      state.vendorsObject[vendorName].itemsAdded = selectFilteredItemsAdded(
        state,
        vendorName,
        itemName
      );
      state.itemsObject[itemName].vendorsAdded = selectFilteredVendorsAdded(
        state,
        itemName,
        vendorName
      );
      const qr = selectQRContent(state, vendorName);
      QRCode.toDataURL(qr, (error, url) => {
        state.vendorsObject[vendorName].qrContent = url;
      });
      state.vendorsObject[vendorName].qrText = qr;
    },
    removeAllItems: (state, action: PayloadAction<VendorName>) => {
      const { payload: vendorName } = action;
      const itemsAdded = selectItemsAdded(state, vendorName);
      itemsAdded.forEach(itemName => {
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

// export const createTopLevelSelectors = (state: AddedState) => {
//   const results = {} as TopLevelSelectors<AddedState>;
//   objectKeys(state).forEach(e => {
//     results[`select${capitalizeFirstLetter(e)}` as const] = (
//       rootState: RootState
//     ) => rootState.added[e];
//   });
//   return results;
// };

// export const topLevelSelectors = createTopLevelSelectors();

// const createTopLevelSelectors = (): TopLevelSelectors<AddedState> => {
//   const keys = objectKeys(initialState) as readonly (keyof AddedState)[];
//   return objectKeys(initialState).reduce<TopLevelSelectors<AddedState>>(
//     (prev: TopLevelSelectors<AddedState>, curr) =>
//       ({
//         ...prev,
//         [`select${capitalizeFirstLetter(curr)}`]: (state: RootState) =>
//           state.added[curr],
//       }) as const,
//     {}
//   );
// };

// export const topLevelSelectors = createTopLevelSelectors();

export default addedSlice.reducer;
