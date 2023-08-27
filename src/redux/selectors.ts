import type { ItemNamesAndKeywords } from "../types/api";
import type { AddedState } from "../types/redux";
import emptyArray from "../utils/emptyArray";
import search from "../utils/search";
import cartAdapter from "./adapters/cartAdapter";
import categoriesAdapter from "./adapters/categoriesAdapter";
import itemsAdapter from "./adapters/itemsAdapter";
import searchResultsAdapter, {
  checkedVendorItemsAdapter,
} from "./adapters/searchResultsAdapter";
import vendorsAdapter from "./adapters/vendorsAdapter";
import { endpoints } from "./apiSlice";
import {
  ParametricSelectors,
  simpleSelectors,
  TopLevelSelectors,
} from "./draftSafeSelectors";
import type { AppSelector } from "./hooks";
import { createAppSelector, createDraftSafeRootSelector } from "./hooks";
import initialStates from "./initialStates";
import type { RootState } from "./store";

type RootParametricSelectors = ParametricSelectors<
  RootState,
  readonly [
    itemId: {
      readonly name: "itemId";
      readonly params: readonly [itemId: number];
      readonly returnType: number;
    },
    cartId: {
      readonly name: "cartId";
      readonly params: readonly [cartId: number];
      readonly returnType: number;
    },
    cartIdAndItemId: {
      readonly name: "cartIdAndItemId";
      readonly params: readonly [cartId: number, itemId: number];
      readonly returnType: number;
    },
    ItemIdAndCartId: {
      readonly name: "ItemIdAndCartId";
      readonly params: readonly [itemId: number, cartId: number];
      readonly returnType: number;
    },
  ]
>;

const rootParametricSelectors: RootParametricSelectors = {
  getItemId: (state, itemId) => itemId,
  getCartId: (state, cartId) => cartId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootParametricSelectors;

const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const selectMainResults = endpoints.getMain.select();

export const selectMainData = createDraftSafeRootSelector(
  [selectMainResults],
  results => results.data
);

export const selectItemsData = createDraftSafeRootSelector(
  [selectMainData],
  data => itemsAdapter.setAll(initialStates.items, data?.items ?? emptyArray)
);

export const selectVendorsData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    vendorsAdapter.setAll(initialStates.vendors, data?.vendors ?? emptyArray)
);

export const selectCategoriesData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    categoriesAdapter.setAll(
      initialStates.categories,
      data?.categories ?? emptyArray
    )
);

const topLevelSelectors: TopLevelSelectors<RootState, "added"> = {
  searchResults: createAppSelector([selectAdded], added => added.searchResults),

  cart: createAppSelector([selectAdded], added => added.cart),

  // items: createAppSelector([selectAdded], added => added.items),

  // vendors: createAppSelector([selectAdded], added => added.vendors),

  // categories: createAppSelector([selectAdded], added => added.categories),
  checkedVendorItems: createAppSelector(
    [selectAdded],
    added => added.checkedVendorItems
  ),
};

export const globalizedSelectors = {
  searchResults: searchResultsAdapter.getSelectors<RootState>(
    topLevelSelectors.searchResults
  ),

  cart: cartAdapter.getSelectors<RootState>(topLevelSelectors.cart),

  items: itemsAdapter.getSelectors<RootState>(selectItemsData),
  // items: itemsAdapter.getSelectors<RootState>(topLevelSelectors.items),

  vendors: vendorsAdapter.getSelectors<RootState>(selectVendorsData),
  // vendors: vendorsAdapter.getSelectors<RootState>(topLevelSelectors.vendors),

  categories: categoriesAdapter.getSelectors<RootState>(selectCategoriesData),
  // categories: categoriesAdapter.getSelectors<RootState>(
  //   topLevelSelectors.categories
  // ),
  checkedVendorItems: checkedVendorItemsAdapter.getSelectors<RootState>(
    topLevelSelectors.checkedVendorItems
  ),
};

export const selectVendorsLinks = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.link ?? ""
);

export const selectItemNumber = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.itemNumber ?? ""
);
// export const selectItemNumber = createAppSelector(
//   [globalizedSelectors.items.selectById],
//   item => item?.itemNumber ?? ""
// );

export const selectItemSrc = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.src ?? ""
);

export const selectItemName = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.name ?? ""
);

export const selectVendorIdsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.vendors ?? emptyArray
  // {
  //   memoizeOptions: {
  //     resultEqualityCheck: shallowEqual,
  //     equalityCheck: shallowEqual,
  //     maxSize: 10,
  //   },
  // }
);

export const selectItemNamesAndKeywords = createAppSelector(
  [globalizedSelectors.items.selectAll],
  items =>
    items.map<ItemNamesAndKeywords>(({ name, keywords, id, vendors }) => ({
      name,
      keywords,
      id,
      vendors,
    }))
);

export const selectItemNamesAndKeywordsSorted = createAppSelector(
  [selectItemNamesAndKeywords, (state, value: string) => value],
  (itemNamesAndKeywords, value) => search(value, itemNamesAndKeywords)
);
export const checkIfAnyItemsAdded = createAppSelector(
  [globalizedSelectors.cart.selectAll],
  carts =>
    carts.reduce<boolean>(
      (acc, curr) =>
        simpleSelectors.cartItems.selectTotal(curr.items) > 0 || acc,
      false
    )
);

const selectCartItems = createAppSelector(
  [globalizedSelectors.cart.selectById],
  cart => cart?.items ?? initialStates.cartItems
);

export const selectCartItemsIds = createAppSelector(
  [selectCartItems],
  simpleSelectors.cartItems.selectIds
);

export const selectCartItemNamesStringified = createAppSelector(
  [selectCartItemsIds, globalizedSelectors.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds.map<string>(e => itemsEntities[e]?.name ?? "").join(", ")
);

export const selectCheckedVendorIds = createAppSelector(
  [globalizedSelectors.checkedVendorItems.selectById],
  checkedVendorItem => checkedVendorItem?.checkedVendors ?? emptyArray
);
// export const selectCheckedVendorIds = createAppSelector(
//   [globalizedSelectors.searchResults.selectById],
//   searchResult =>
//     searchResult
//       ? simpleSelectors.checkedVendors
//           .selectAll(searchResult.checkedVendors)
//           .filter(({ checked }) => checked)
//           .map(({ id }) => id)
//       : emptyArray
// );
// export const selectCheckedVendorIds = createAppSelector(
//   [globalizedSelectors.searchResults.selectById],
//   searchResult =>
//     searchResult == null ||
//     simpleSelectors.checkedVendors.selectTotal(searchResult.checkedVendors) ===
//       0
//       ? emptyArray
//       : searchResult.checkedVendors
// );

export const isVendorChecked = createAppSelector(
  [
    globalizedSelectors.checkedVendorItems.selectById,
    rootParametricSelectors.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendors.includes(vendorId)
);
// export const isVendorChecked = createAppSelector(
//   [selectCheckedVendorIds, rootParametricSelectors.getItemIdAndCartId],
//   (checkedVendorIds, vendorId) => checkedVendorIds.includes(vendorId)
// );

const selectCartItem = createAppSelector(
  [selectCartItems, rootParametricSelectors.getCartIdAndItemId],
  simpleSelectors.cartItems.selectById
);

export const isMinimized = createAppSelector(
  [selectCartItem],
  cartItems => !!cartItems?.minimized
);

export const selectCategoryName = createAppSelector(
  [globalizedSelectors.categories.selectById],
  category => category?.name
);

export const selectCategoryItemIds = createAppSelector(
  [globalizedSelectors.categories.selectById],
  category => category?.itemIds ?? emptyArray
);

// export const checkIfAddedToVendor = createAppSelector(
//   [
//     globalizedSelectors.cart.selectById,
//     rootParametricSelectors.getCartIdAndItemId,
//   ],
//   (cart, itemId) =>
//     simpleSelectors.cartItems.selectIds(cart?.items).includes(itemId)
// );
export const checkIfAddedToVendor = createAppSelector(
  [selectCartItemsIds, rootParametricSelectors.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId)
);

export const checkIfAnyAddedToOneVendor = createAppSelector(
  [selectCartItemsIds],
  cartItemsIds => cartItemsIds.length > 0
);

export const checkVendorsToAdd = createAppSelector(
  [checkIfAddedToVendor],
  ifVendorsAdded => !ifVendorsAdded
);

export const selectAddedItemsLength = createAppSelector(
  [selectCartItems],
  simpleSelectors.cartItems.selectTotal
);

export const selectQRCodeText = createAppSelector(
  [
    selectCartItemsIds,
    globalizedSelectors.items.selectEntities,
    globalizedSelectors.vendors.selectById,
  ],
  (cartItemsIds, itemEntities, vendor) =>
    cartItemsIds.map(e => itemEntities[e]?.itemNumber).join(vendor?.joinChars)
);

export const selectOfficialName = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.officialName
);

export const selectVendorItemIds = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.itemIds ?? emptyArray
);

const selectCartsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById, globalizedSelectors.cart.selectAll],
  (item, carts) => carts.filter(e => item?.vendors.includes(e.id))
);

// export const checkIfAddedToAllVendors = createAppSelector(
//   [
//     globalizedSelectors.cart.selectEntities,
//     globalizedSelectors.checkedVendorItems.selectById,
//     rootParametricSelectors.getItemId,
//   ],
//   (cartEntities, checkedVendorItem, itemId) =>
//     checkedVendorItem?.vendors
//       .map(e => cartEntities[e])
//       .reduce<boolean>(
//         (acc, curr) =>
//           simpleSelectors.cartItems.selectIds(curr.items).includes(itemId) &&
//           acc,
//         true
//       )
// );
export const checkIfAddedToAllVendors = createAppSelector(
  [selectCartsByItemId, rootParametricSelectors.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (acc, curr) =>
        simpleSelectors.cartItems.selectIds(curr.items).includes(itemId) && acc,
      true
    )
);

// export const selectShownSearchResults = createAppSelector(
//   [globalizedSelectors.searchResults.selectAll],
//   searchResults => searchResults.filter(({ shown }) => shown)
// );

// export const selectShownSearchResultsIds = createAppSelector(
//   [selectShownSearchResults],
//   searchResults => searchResults.map(({ id }) => id)
// );
