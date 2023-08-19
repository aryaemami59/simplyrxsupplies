import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { Selector } from "reselect";

import type { VendorName } from "../types/api";
import type { AddedState } from "../types/redux";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import objectKeys from "../utils/objectKeys";
import { createDraftSafeAppSelector } from "./hooks";

export const selectSelf: Selector<AddedState, AddedState, never> = (
  state: AddedState
) => state;

export type AddedSelector<
  Return = unknown,
  Params extends readonly unknown[] = unknown[],
> = Selector<AddedState, Return, Params>;

export type TopLevelSelectors<State extends object> = {
  [K in keyof State as `select${Capitalize<Extract<K, string>>}`]: Selector<
    State,
    State[K],
    never
  >;
};

export type ParametricSelectors<
  State extends object,
  Params extends Record<string, unknown>,
> = {
  readonly [K in keyof Params as `get${Capitalize<Extract<K, string>>}`]: (
    state: State,
    param: Params[K]
  ) => Params[K];
};

export const parametricSelectors: ParametricSelectors<
  AddedState,
  { itemName: string; vendorName: VendorName }
> = {
  getItemName: (state, itemName) => itemName,
  getVendorName: (state, vendorName) => vendorName,
};

export const topLevelDraftSafeSelectors = {
  selectCategoriesArray: createDraftSafeAppSelector(
    [selectSelf],
    added => added.categoriesArray
  ),
  selectCategoriesObject: createDraftSafeAppSelector(
    [selectSelf],
    added => added.categoriesObject
  ),
  selectItemsArray: createDraftSafeAppSelector(
    [selectSelf],
    added => added.itemsArray
  ),
  selectItemsObject: createDraftSafeAppSelector(
    [selectSelf],
    added => added.itemsObject
  ),
  selectSearchResultsItemNames: createDraftSafeAppSelector(
    [selectSelf],
    added => added.searchResultsItemNames
  ),
  selectVendorsArray: createDraftSafeAppSelector(
    [selectSelf],
    added => added.vendorsArray
  ),
  selectVendorsObject: createDraftSafeAppSelector(
    [selectSelf],
    added => added.vendorsObject
  ),
};

export const createTopLevelDraftSafeSelectors = (state: AddedState) => {
  const results = {} as Record<string, unknown>;
  objectKeys(state).forEach(e => {
    results[`select${capitalizeFirstLetter(e)}`] = createDraftSafeSelector(
      [selectSelf],
      rootState => rootState[e]
    );
  });
  return results as TopLevelSelectors<AddedState>;
};

export const selectVendor = createDraftSafeAppSelector(
  [
    topLevelDraftSafeSelectors.selectVendorsObject,
    parametricSelectors.getVendorName,
  ],
  (vendorsObject, vendorName) => vendorsObject[vendorName]
);

export const selectItemsAdded = createDraftSafeAppSelector(
  [selectVendor],
  vendorsObject => vendorsObject.itemsAdded
);

export const selectItem = createDraftSafeAppSelector(
  [
    topLevelDraftSafeSelectors.selectItemsObject,
    parametricSelectors.getItemName,
  ],
  (itemsObject, itemName) => itemsObject[itemName]
);

export const selectVendorsToAdd = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendorsToAdd
);

export const selectVendorsAdded = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendorsAdded
);

export const selectVendors = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendors
);

export const selectItemNumbers = createDraftSafeAppSelector(
  [topLevelDraftSafeSelectors.selectItemsObject, selectItemsAdded],
  (itemsObject, itemsAdded) => itemsAdded.map(e => itemsObject[e].itemNumber)
);

export const selectQRContent = createDraftSafeAppSelector(
  [selectItemNumbers, selectVendor],
  (itemNumbers, vendorsObject) => itemNumbers.join(vendorsObject.joinChars)
);

export const selectFilteredSearchResultsItemNames = createDraftSafeAppSelector(
  [
    topLevelDraftSafeSelectors.selectSearchResultsItemNames,
    parametricSelectors.getItemName,
  ],
  (searchResultsItemNames, itemName) =>
    searchResultsItemNames.filter(e => e !== itemName)
);

export const selectFilteredItemsAdded = createDraftSafeAppSelector(
  [
    selectItemsAdded,
    (state, vendorName: VendorName, itemName: string) => itemName,
  ],
  (itemsAdded, itemName) =>
    itemsAdded.filter(itemAddedName => itemAddedName !== itemName)
);

export const selectFilteredVendorsAdded = createDraftSafeAppSelector(
  [
    selectVendorsAdded,
    (state, itemName: string, vendorName: VendorName) => vendorName,
  ],
  (vendorsAdded, vendorName) =>
    vendorsAdded.filter(vendor => vendor !== vendorName)
);
