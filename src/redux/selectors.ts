import { createSelector } from "@reduxjs/toolkit";

import type {
  CategoryName,
  ItemName,
  ItemNumber,
  Keywords,
  Link,
  MinimizedItemIds,
  OfficialVendorName,
  SingleItemObject,
  Src as Source,
  VendorName,
} from "../types/api";
import emptyArray from "../utils/emptyArray";
import type { RootState } from "./store";

export const selectAddedItemsByVendor =
  (vendorName: VendorName) =>
  (state: RootState): ItemName[] =>
    state.added.vendorsObject[vendorName].itemsAdded;

export const selectVendorsArray = (state: RootState): VendorName[] =>
  state.added.vendorsArray.length > 0 ? state.added.vendorsArray : emptyArray;

export const selectVendorsLinks =
  (vendorName: VendorName) =>
  (state: RootState): Link =>
    state.added.vendorsObject[vendorName].link;

export const selectCategoriesArray = (state: RootState): CategoryName[] =>
  state.added.categoriesArray;

export const selectAddedItemsLength =
  (vendorName: VendorName) =>
  (state: RootState): number =>
    state.added.vendorsObject[vendorName].itemsAdded.length;

export const selectItemNamesByVendor =
  (vendorName: VendorName) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObject)
      .filter(({ vendors }: SingleItemObject) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectCategoriesItemNames =
  (categoryParameter: CategoryName) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObject)
      .filter(({ category }) => category.includes(categoryParameter as never))
      .map(({ name }) => name);

export const selectItemNamesArray = (state: RootState): ItemName[] =>
  state.added.itemsArray;

export const selectQRCodeContent =
  (vendorName: VendorName) =>
  (state: RootState): string =>
    state.added.vendorsObject[vendorName].qrContent;

export const selectQRText = (vendorName: VendorName) => (state: RootState) =>
  state.added.vendorsObject[vendorName].qrText;

export const checkIfAddedToAllVendors =
  (itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObject[itemName].vendorsAdded.length ===
    state.added.itemsObject[itemName].vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObject[itemName].vendorsAdded.includes(vendorName);

export const checkVendorsToAdd =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObject[itemName].vendorsToAdd.includes(vendorName);

export const checkVendorsAdded =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObject[itemName].vendorsAdded.includes(vendorName);

export const checkIfAnyAddedToOneVendor =
  (vendorName: VendorName) =>
  (state: RootState): boolean =>
    state.added.vendorsObject[vendorName].itemsAdded.length > 0;

export const selectItemNumber =
  (itemName: ItemName) =>
  (state: RootState): ItemNumber =>
    state.added.itemsObject[itemName].itemNumber;

export const selectItemSrc =
  (itemName: ItemName) =>
  (state: RootState): Source =>
    state.added.itemsObject[itemName].src;

export const selectVendorsByItemName =
  (itemName: ItemName) =>
  (state: RootState): VendorName[] =>
    state.added.itemsObject[itemName].vendors;

export const selectVendorOfficialName =
  (vendorName: VendorName) =>
  (state: RootState): OfficialVendorName =>
    state.added.vendorsObject[vendorName].officialName;

export const selectMinimized =
  (vendorName: VendorName) =>
  (state: RootState): MinimizedItemIds =>
    state.added.vendorsObject[vendorName].minimizedItemIds;

export const checkIfMinimizedIsFull =
  (vendorName: VendorName) =>
  (state: RootState): boolean =>
    state.added.vendorsObject[vendorName].minimizedItemIds.length ===
    state.added.vendorsObject[vendorName].itemsAdded.length;

export const checkIfMinimized =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.vendorsObject[vendorName].minimizedItemIds.includes(
      state.added.itemsObject[itemName].id
    );

export const selectAllListItems = (state: RootState) => state.added.listItems;

export const selectItemsObject = (state: RootState) => state.added.itemsObject;

export const selectKeywords =
  (itemName: ItemName) =>
  (state: RootState): Keywords =>
    state.added.itemsObject[itemName].keywords;

export const selectItemNamesAndKeywords = createSelector(
  [selectItemNamesArray, selectItemsObject],
  (itemsArray, itemsObject) =>
    itemsArray.map(itemName => ({
      name: itemsObject[itemName].name,
      keywords: itemsObject[itemName].keywords,
    }))
);

export const checkIfAnyItemsAdded = (state: RootState): boolean =>
  Object.values(state.added.vendorsObject).reduce(
    (accumulator, { itemsAdded }) => itemsAdded.length > 0 || accumulator,
    false
  );

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;

export const selectErrorMessage = (state: RootState): string =>
  state.added.errorMessage;
