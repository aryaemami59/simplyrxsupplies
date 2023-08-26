import type { ItemNamesAndKeywords } from "../types/api";
import type { AddedState } from "../types/redux";
import emptyArray from "../utils/emptyArray";
import isEmptyArrayReference from "../utils/predicates/isEmptyArrayReference";
import { cartAdapter } from "./adapters/cartAdapter";
import { initialCartItemsAdapterState } from "./adapters/cartItemsAdapter";
import { categoriesAdapter } from "./adapters/categoriesAdapter";
import { itemsAdapter } from "./adapters/itemsAdapter";
import { searchResultsAdapter } from "./adapters/searchResultsAdapter";
import { vendorsAdapter } from "./adapters/vendorsAdapter";
import {
  ParametricSelectors,
  simpleSelectors,
  TopLevelSelectors,
} from "./draftSafeSelectors";
import type { AppSelector } from "./hooks";
import { createAppSelector } from "./hooks";
import type { RootState } from "./store";

export type RootParametricSelectors = ParametricSelectors<
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

export const rootParametricSelectors: RootParametricSelectors = {
  getItemId: (state, itemId) => itemId,
  getCartId: (state, cartId) => cartId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootParametricSelectors;

export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const topLevelSelectors: TopLevelSelectors<RootState, "added"> = {
  searchResults: createAppSelector([selectAdded], added => added.searchResults),

  cart: createAppSelector([selectAdded], added => added.cart),

  items: createAppSelector([selectAdded], added => added.items),

  vendors: createAppSelector([selectAdded], added => added.vendors),

  categories: createAppSelector([selectAdded], added => added.categories),
};

export const globalizedSelectors = {
  searchResults: searchResultsAdapter.getSelectors<RootState>(
    topLevelSelectors.searchResults
  ),

  cart: cartAdapter.getSelectors<RootState>(topLevelSelectors.cart),

  items: itemsAdapter.getSelectors<RootState>(topLevelSelectors.items),

  vendors: vendorsAdapter.getSelectors<RootState>(topLevelSelectors.vendors),

  categories: categoriesAdapter.getSelectors<RootState>(
    topLevelSelectors.categories
  ),
};

export const selectVendorsLinks = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.link
);

export const selectItemNumber = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => (item ? item.itemNumber : "")
);

export const selectItemSrc = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.src
);

export const selectItemName = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => (item ? item.name : "")
);

export const selectVendorIdsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => (item ? item.vendors : emptyArray)
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
    items.map<ItemNamesAndKeywords>(
      ({ name, keywords, id, category, itemNumber, vendors }) => ({
        name,
        keywords,
        id,
        category,
        itemNumber,
        vendors,
      })
    )
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

export const selectCartItems = createAppSelector(
  [globalizedSelectors.cart.selectById],
  cart => (cart ? cart.items : initialCartItemsAdapterState)
);

export const selectCartItemsIds = createAppSelector(
  [selectCartItems],
  simpleSelectors.cartItems.selectIds
);

export const selectCartItemNames = createAppSelector(
  [selectCartItemsIds, globalizedSelectors.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds.map<string>(e => itemsEntities[e]?.name ?? "")
);

export const selectCartItemNamesStringified = createAppSelector(
  [selectCartItemNames],
  cartItemNames => cartItemNames.join(", ")
);

export const selectCheckedVendorIds = createAppSelector(
  [globalizedSelectors.searchResults.selectById],
  searchResult =>
    searchResult == null || searchResult.checkedVendors.length === 0
      ? emptyArray
      : searchResult.checkedVendors
);

export const isVendorChecked = createAppSelector(
  [selectCheckedVendorIds, rootParametricSelectors.getItemIdAndCartId],
  (checkedVendorIds, vendorId) =>
    isEmptyArrayReference(checkedVendorIds) ||
    checkedVendorIds.includes(vendorId)
);

export const selectCartItem = createAppSelector(
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
  category => (category ? category.itemIds : emptyArray)
);

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
  vendor => (vendor ? vendor.itemIds : emptyArray)
);

export const selectCartsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById, globalizedSelectors.cart.selectAll],
  (item, carts) => carts.filter(e => item?.vendors.includes(e.id))
);

export const checkIfAddedToAllVendors = createAppSelector(
  [selectCartsByItemId, rootParametricSelectors.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (acc, curr) =>
        simpleSelectors.cartItems.selectIds(curr.items).includes(itemId) && acc,
      true
    )
);
