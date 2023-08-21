import type { Selector } from "reselect";

import type { VendorName } from "../types/api";
import type { AddedState } from "../types/redux";
import {
  AppSelector,
  createAppSelector,
  createDraftSafeAppSelector,
} from "./hooks";

export const selectSelf: Selector<AddedState, AddedState, never> = (
  state: AddedState
) => state;

export type AddedSelector<
  Return = unknown,
  Params extends readonly unknown[] = unknown[],
> = Selector<AddedState, Return, Params>;

export type TopLevelSelectors<
  State extends object,
  P extends keyof State = never,
> = [P] extends [never]
  ? {
      [K in keyof State as `select${Capitalize<
        Extract<K, string>
      >}`]: ReturnType<
        typeof createDraftSafeAppSelector<
          [AddedSelector<State, never>],
          State[K]
        >
      >;
    }
  : {
      [K in keyof State[P] as `select${Capitalize<
        Extract<K, string>
      >}`]: ReturnType<
        typeof createAppSelector<[AppSelector<AddedState, never>], State[P][K]>
      >;
    };

export type ParametricSelectors<
  State extends object,
  Params extends readonly {
    readonly params: readonly unknown[];
    readonly returnType: unknown;
    readonly name: string;
  }[],
> = {
  readonly [K in Params[number] as `get${Capitalize<K["name"]>}`]: (
    state: State,
    ...params: K["params"]
  ) => K["returnType"];
};

export type DraftSelectorsParametricSelectors = ParametricSelectors<
  AddedState,
  readonly [
    itemName: {
      readonly name: "itemName";
      readonly params: readonly [itemName: string];
      readonly returnType: string;
    },
    vendorName: {
      readonly name: "vendorName";
      readonly params: readonly [vendorName: VendorName];
      readonly returnType: VendorName;
    },
    itemAndVendorName: {
      readonly name: "itemAndVendorName";
      readonly params: readonly [itemName: string, vendorName: VendorName];
      readonly returnType: VendorName;
    },
    VendorAndItemName: {
      readonly name: "VendorAndItemName";
      readonly params: readonly [vendorName: VendorName, itemName: string];
      readonly returnType: string;
    },
  ]
>;

export const parametricSelectors = {
  getItemName: (state, itemName) => itemName,
  getVendorName: (state, vendorName) => vendorName,
  getItemAndVendorName: (state, itemName, vendorName) => vendorName,
  getVendorAndItemName: (state, vendorName, itemName) => itemName,
} as const satisfies DraftSelectorsParametricSelectors;

export const topLevelDraftSafeSelectors: TopLevelSelectors<AddedState> = {
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
    added => added.searchResults
  ),
  selectVendorsArray: createDraftSafeAppSelector(
    [selectSelf],
    added => added.vendorsArray
  ),
  selectVendorsObject: createDraftSafeAppSelector(
    [selectSelf],
    added => added.vendorsObject
  ),
} as const;

// export const createTopLevelDraftSafeSelectors = (state: AddedState) => {
//   const results = {} as Record<string, unknown>;
//   objectKeys(state).forEach(e => {
//     results[`select${capitalizeFirstLetter(e)}`] = createDraftSafeSelector(
//       [selectSelf],
//       rootState => rootState[e]
//     );
//   });
//   return results as TopLevelSelectors<AddedState>;
// };

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

export const selectVendors = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendors
);

export const selectVendorsToAdd = createDraftSafeAppSelector(
  [
    topLevelDraftSafeSelectors.selectVendorsObject,
    selectVendors,
    parametricSelectors.getItemName,
  ],
  (vendorsObject, vendors, itemName) =>
    vendors.filter(e => vendorsObject[e].itemsAdded.includes(itemName))
);

export const selectVendorsAdded = createDraftSafeAppSelector(
  [
    topLevelDraftSafeSelectors.selectVendorsObject,
    selectVendors,
    parametricSelectors.getItemName,
  ],
  (vendorsObject, vendors, itemName) =>
    vendors.filter(e => !vendorsObject[e].itemsAdded.includes(itemName))
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
  [selectItemsAdded, parametricSelectors.getVendorAndItemName],
  (itemsAdded, itemName) =>
    itemsAdded.filter(itemAddedName => itemAddedName !== itemName)
);

export const selectFilteredVendorsAdded = createDraftSafeAppSelector(
  [selectVendorsAdded, parametricSelectors.getItemAndVendorName],
  (vendorsAdded, vendorName) =>
    vendorsAdded.filter(vendor => vendor !== vendorName)
);
