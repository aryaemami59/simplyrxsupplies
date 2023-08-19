import type { CategoryName, VendorName, VendorObject } from "../types/api";
import type { AddedState } from "../types/redux";
import { TopLevelSelectors } from "./draftSafeSelectors";
import type { AppSelector } from "./hooks";
import { createAppSelector } from "./hooks";
import type { RootState } from "./store";

export const selectAdded: AppSelector<AddedState> = state => state.added;

export const topLevelAddedSelectors = {
  selectItemsObject: createAppSelector(
    [selectAdded],
    added => added.itemsObject
  ),
  selectVendorsObject: createAppSelector(
    [selectAdded],
    added => added.vendorsObject
  ),
  selectItemsArray: createAppSelector([selectAdded], added => added.itemsArray),
  selectSearchResultsItemNames: createAppSelector(
    [selectAdded],
    added => added.searchResultsItemNames
  ),
  selectCategoriesArray: createAppSelector(
    [selectAdded],
    added => added.categoriesArray
  ),
  selectCategoriesObject: createAppSelector(
    [selectAdded],
    added => added.categoriesObject
  ),
  selectVendorsArray: createAppSelector(
    [selectAdded],
    added => added.vendorsArray
  ),
} as const satisfies TopLevelSelectors<RootState, "added">;

export const {
  selectCategoriesArray,
  selectCategoriesObject,
  selectItemsArray,
  selectItemsObject,
  selectSearchResultsItemNames,
  selectVendorsArray,
  selectVendorsObject,
} = topLevelAddedSelectors;

// export const selectVendorsArray = createAppSelector([selectAdded], added =>
//   added.vendorsArray.length > 0 ? added.vendorsArray : emptyArray
// );

export const selectItemsAddedByVendorName = (
  state: RootState,
  singleVendorObject: VendorObject[keyof VendorObject]
) => singleVendorObject.itemsAdded;

export const selectAddedItemsByVendor = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded
  );

export const selectVendorsLinks = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].link
  );

export const selectAddedItemsLength = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length
  );

export const selectItemsObjectValues = createAppSelector(
  [topLevelAddedSelectors.selectItemsObject],
  itemsObject => Object.values(itemsObject)
);

export const selectItemNamesByVendor = (vendorName: VendorName) =>
  createAppSelector([selectItemsObjectValues], itemsObjectValues =>
    itemsObjectValues
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name)
  );

export const selectCategoriesItemNames = (categoryName: CategoryName) =>
  createAppSelector([selectItemsObjectValues], itemsObjectValues =>
    itemsObjectValues
      .filter(({ category }) => category.includes(categoryName))
      .map(({ name }) => name)
  );

export const selectQRCodeContent = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrContent
  );

export const selectQRText = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrText
  );

export const checkIfAddedToAllVendors = (itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject =>
      vendorsObject[itemName].vendorsAdded.length ===
      vendorsObject[itemName].vendors.length
  );

export const checkIfItemAddedToOneVendor = (
  vendorName: VendorName,
  itemName: string
) =>
  createAppSelector([topLevelAddedSelectors.selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsAdded.includes(vendorName)
  );

export const checkVendorsToAdd = (vendorName: VendorName, itemName: string) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => !vendorsObject[vendorName].itemsAdded.includes(itemName)
  );

export const checkVendorsAdded = (vendorName: VendorName, itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.includes(itemName)
  );

export const checkIfAnyAddedToOneVendor = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length > 0
  );

export const selectItemNumber = (itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectItemsObject],
    itemsObject => itemsObject[itemName].itemNumber
  );

export const selectItemSrc = (itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectItemsObject],
    itemsObject => itemsObject[itemName].src
  );

export const selectVendorsByItemName = (itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectItemsObject],
    itemsObject => itemsObject[itemName].vendors
  );

export const selectVendorOfficialName = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].officialName
  );

export const selectMinimized = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].minimizedItemIds
  );

export const checkIfMinimizedIsFull = (vendorName: VendorName) =>
  createAppSelector(
    [topLevelAddedSelectors.selectVendorsObject],
    vendorsObject =>
      vendorsObject[vendorName].minimizedItemIds.length ===
      vendorsObject[vendorName].itemsAdded.length
  );

export const checkIfMinimized = (vendorName: VendorName, itemName: string) =>
  createAppSelector(
    [
      topLevelAddedSelectors.selectVendorsObject,
      topLevelAddedSelectors.selectItemsObject,
    ],
    (vendorsObject, itemsObject) =>
      vendorsObject[vendorName].minimizedItemIds.includes(
        itemsObject[itemName].id
      )
  );

export const selectKeywords = (itemName: string) =>
  createAppSelector(
    [topLevelAddedSelectors.selectItemsObject],
    itemsObject => itemsObject[itemName].keywords
  );

export const selectItemNamesAndKeywords = createAppSelector(
  [
    topLevelAddedSelectors.selectItemsArray,
    topLevelAddedSelectors.selectItemsObject,
  ],
  (itemsArray, itemsObject) =>
    itemsArray.map(itemName => ({
      name: itemsObject[itemName].name,
      keywords: itemsObject[itemName].keywords,
    }))
);

export const selectVendorsObjectValues = createAppSelector(
  [topLevelAddedSelectors.selectVendorsObject],
  vendorsObject => Object.values(vendorsObject)
);

export const checkIfAnyItemsAdded = createAppSelector(
  [selectVendorsObjectValues],
  vendorsObjectValues =>
    vendorsObjectValues.reduce(
      (accumulator, { itemsAdded }) => itemsAdded.length > 0 || accumulator,
      false
    )
);
