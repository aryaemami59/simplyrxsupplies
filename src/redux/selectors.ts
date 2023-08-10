import { createSelector } from "@reduxjs/toolkit";

import type {
  CategoryName,
  ItemName,
  SingleVendorObject,
  VendorName,
} from "../types/aa";
import emptyArray from "../utils/emptyArray";
import type { RootState } from "./store";

export const selectAdded = (state: RootState) => state.added;

export const selectItemsObject = createSelector(
  [selectAdded],
  added => added.itemsObject
);

export const selectVendorsObject = createSelector(
  [selectAdded],
  added => added.vendorsObject
);

export const selectItemNamesArray = createSelector(
  [selectAdded],
  added => added.itemsArray
);

export const selectAllListItems = createSelector(
  [selectAdded],
  added => added.searchResultsItemNames
);

export const selectCategoriesArray = createSelector(
  [selectAdded],
  added => added.categoriesArray
);

export const selectVendorsArray = createSelector([selectAdded], added =>
  added.vendorsArray.length > 0 ? added.vendorsArray : emptyArray
);

export const selectItemsAddedByVendorName = (
  state: RootState,
  singleVendorObject: SingleVendorObject
) => singleVendorObject.itemsAdded;

export const selectAddedItemsByVendor = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded
  );

export const selectVendorsLinks = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].link
  );

export const selectAddedItemsLength = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length
  );

export const selectItemsObjectValues = createSelector(
  [selectItemsObject],
  itemsObject => Object.values(itemsObject)
);

export const selectItemNamesByVendor = (vendorName: VendorName) =>
  createSelector([selectItemsObjectValues], itemsObjectValues =>
    itemsObjectValues
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name)
  );

export const selectCategoriesItemNames = (categoryName: CategoryName) =>
  createSelector([selectItemsObjectValues], itemsObjectValues =>
    itemsObjectValues
      .filter(({ category }) => category.includes(categoryName))
      .map(({ name }) => name)
  );

export const selectQRCodeContent = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrContent
  );

export const selectQRText = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrText
  );

export const checkIfAddedToAllVendors = (itemName: ItemName) =>
  createSelector(
    [selectItemsObject],
    itemsObject =>
      itemsObject[itemName].vendorsAdded.length ===
      itemsObject[itemName].vendors.length
  );

export const checkIfItemAddedToOneVendor = (
  vendorName: VendorName,
  itemName: ItemName
) =>
  createSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsAdded.includes(vendorName)
  );

export const checkVendorsToAdd = (vendorName: VendorName, itemName: ItemName) =>
  createSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsToAdd.includes(vendorName)
  );

export const checkVendorsAdded = (vendorName: VendorName, itemName: ItemName) =>
  createSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsAdded.includes(vendorName)
  );

export const checkIfAnyAddedToOneVendor = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length > 0
  );

export const selectItemNumber = (itemName: ItemName) =>
  createSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].itemNumber
  );

export const selectItemSrc = (itemName: ItemName) =>
  createSelector([selectItemsObject], itemsObject => itemsObject[itemName].src);

export const selectVendorsByItemName = (itemName: ItemName) =>
  createSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].vendors
  );

export const selectVendorOfficialName = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].officialName
  );

export const selectMinimized = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].minimizedItemIds
  );

export const checkIfMinimizedIsFull = (vendorName: VendorName) =>
  createSelector(
    [selectVendorsObject],
    vendorsObject =>
      vendorsObject[vendorName].minimizedItemIds.length ===
      vendorsObject[vendorName].itemsAdded.length
  );

export const checkIfMinimized = (vendorName: VendorName, itemName: ItemName) =>
  createSelector(
    [selectVendorsObject, selectItemsObject],
    (vendorsObject, itemsObject) =>
      vendorsObject[vendorName].minimizedItemIds.includes(
        itemsObject[itemName].id
      )
  );

export const selectKeywords = (itemName: ItemName) =>
  createSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].keywords
  );

export const selectItemNamesAndKeywords = createSelector(
  [selectItemNamesArray, selectItemsObject],
  (itemsArray, itemsObject) =>
    itemsArray.map(itemName => ({
      name: itemsObject[itemName].name,
      keywords: itemsObject[itemName].keywords,
    }))
);

export const selectVendorsObjectValues = createSelector(
  [selectVendorsObject],
  vendorsObject => Object.values(vendorsObject)
);

export const checkIfAnyItemsAdded = createSelector(
  [selectVendorsObjectValues],
  vendorsObjectValues =>
    vendorsObjectValues.reduce(
      (accumulator, { itemsAdded }) => itemsAdded.length > 0 || accumulator,
      false
    )
);

export const checkIfLoading = createSelector(
  [selectAdded],
  added => added.isLoading
);

export const selectErrorMessage = createSelector(
  [selectAdded],
  added => added.errorMessage
);
