import type {
  CategoryName,
  SingleItemObject,
  VendorName,
  VendorObject,
} from "../types/api";
import type { AddedState } from "../types/redux";
import emptyArray from "../utils/emptyArray";
import type { AppSelector } from "./hooks";
import { createAppSelector } from "./hooks";
import type { RootState } from "./store";

export const selectAdded: AppSelector<AddedState> = state => state.added;

// export const createTopLevelSelectors = <State extends Record<string, unknown>>(
//   state: State
// ): TopLevelSelectors<State> => {
//   const results = {} as TopLevelSelectors<State>;
//   objectKeys(state).forEach(e => {
//     results[`select${capitalizeFirstLetter(e)}`] = (rootState: State) =>
//       rootState[e];
//   });
//   return results;
// };

// export const structured = createStructuredSelector<AddedState>({
//   searchResultsItemNames: state => state.searchResultsItemNames,
//   itemsArray: state => state.itemsArray,
//   itemsObject: undefined,
//   vendorsArray: [],
//   vendorsObject: undefined,
//   categoriesArray: [],
//   categoriesObject: undefined,
// });

export const selectItemsObject = createAppSelector<
  [typeof selectAdded],
  Record<string, SingleItemObject>
>([selectAdded], added => added.itemsObject);

export const selectVendorsObject = createAppSelector(
  [selectAdded],
  added => added.vendorsObject
);

export const selectItemNamesArray = createAppSelector(
  [selectAdded],
  added => added.itemsArray
);

export const selectAllListItems = createAppSelector(
  [selectAdded],
  added => added.searchResultsItemNames
);

export const selectCategoriesArray = createAppSelector(
  [selectAdded],
  added => added.categoriesArray
);

export const selectVendorsArray = createAppSelector([selectAdded], added =>
  added.vendorsArray.length > 0 ? added.vendorsArray : emptyArray
);

export const selectItemsAddedByVendorName = (
  state: RootState,
  singleVendorObject: VendorObject[keyof VendorObject]
) => singleVendorObject.itemsAdded;

export const selectAddedItemsByVendor = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded
  );

export const selectVendorsLinks = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].link
  );

export const selectAddedItemsLength = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length
  );

export const selectItemsObjectValues = createAppSelector(
  [selectItemsObject],
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
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrContent
  );

export const selectQRText = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].qrText
  );

export const checkIfAddedToAllVendors = (itemName: string) =>
  createAppSelector(
    [selectItemsObject],
    itemsObject =>
      itemsObject[itemName].vendorsAdded.length ===
      itemsObject[itemName].vendors.length
  );

export const checkIfItemAddedToOneVendor = (
  vendorName: VendorName,
  itemName: string
) =>
  createAppSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsAdded.includes(vendorName)
  );

export const checkVendorsToAdd = (vendorName: VendorName, itemName: string) =>
  createAppSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsToAdd.includes(vendorName)
  );

export const checkVendorsAdded = (vendorName: VendorName, itemName: string) =>
  createAppSelector([selectItemsObject], itemsObject =>
    itemsObject[itemName].vendorsAdded.includes(vendorName)
  );

export const checkIfAnyAddedToOneVendor = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].itemsAdded.length > 0
  );

export const selectItemNumber = (itemName: string) =>
  createAppSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].itemNumber
  );

export const selectItemSrc = (itemName: string) =>
  createAppSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].src
  );

export const selectVendorsByItemName = (itemName: string) =>
  createAppSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].vendors
  );

export const selectVendorOfficialName = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].officialName
  );

export const selectMinimized = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject => vendorsObject[vendorName].minimizedItemIds
  );

export const checkIfMinimizedIsFull = (vendorName: VendorName) =>
  createAppSelector(
    [selectVendorsObject],
    vendorsObject =>
      vendorsObject[vendorName].minimizedItemIds.length ===
      vendorsObject[vendorName].itemsAdded.length
  );

export const checkIfMinimized = (vendorName: VendorName, itemName: string) =>
  createAppSelector(
    [selectVendorsObject, selectItemsObject],
    (vendorsObject, itemsObject) =>
      vendorsObject[vendorName].minimizedItemIds.includes(
        itemsObject[itemName].id
      )
  );

export const selectKeywords = (itemName: string) =>
  createAppSelector(
    [selectItemsObject],
    itemsObject => itemsObject[itemName].keywords
  );

export const selectItemNamesAndKeywords = createAppSelector(
  [selectItemNamesArray, selectItemsObject],
  (itemsArray, itemsObject) =>
    itemsArray.map(itemName => ({
      name: itemsObject[itemName].name,
      keywords: itemsObject[itemName].keywords,
    }))
);

export const selectVendorsObjectValues = createAppSelector(
  [selectVendorsObject],
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
