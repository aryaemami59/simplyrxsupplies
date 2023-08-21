import QRCode from "qrcode";
import { shallowEqual } from "react-redux";

import type { ItemNamesAndKeywords } from "../types/api";
import type { AddedState } from "../types/redux";
import emptyArray from "../utils/emptyArray";
import isEmptyArrayReference from "../utils/predicates/isEmptyArrayReference";
import { cartAdapter } from "./adapters/cartAdapter";
import { cartItemsAdapter } from "./adapters/cartItemsAdapter";
import { categoriesAdapter } from "./adapters/categoriesAdapter";
import { itemsAdapter } from "./adapters/itemsAdapter";
import { searchResultsAdapter } from "./adapters/searchResultsAdapter";
import { vendorsAdapter } from "./adapters/vendorsAdapter";
import { ParametricSelectors } from "./draftSafeSelectors";
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

export const itemsAdapterSelectors = itemsAdapter.getSelectors<RootState>(
  state => state.added.items
);

export const vendorsAdapterSelectors = vendorsAdapter.getSelectors<RootState>(
  state => state.added.vendors
);

export const categoriesAdapterSelectors =
  categoriesAdapter.getSelectors<RootState>(state => state.added.categories);

export const searchResultsAdapterSelectors =
  searchResultsAdapter.getSelectors<RootState>(
    state => state.added.searchResults
  );

export const cartAdapterSelectors = cartAdapter.getSelectors<RootState>(
  state => state.added.cart
);

export const cartItemsAdapterSelectors = cartItemsAdapter.getSelectors();

export const selectAdded: AppSelector<AddedState> = state => state.added;

export const selectVendorsLinks = createAppSelector(
  [vendorsAdapterSelectors.selectById],
  vendor => vendor.link
);

export const selectAddedItemsLength = createAppSelector(
  [cartAdapterSelectors.selectEntities, rootParametricSelectors.getCartId],
  (entities, cartId) => entities[cartId].items.ids.length
);

export const selectQRCodeText = createAppSelector(
  [
    cartAdapterSelectors.selectById,
    itemsAdapterSelectors.selectEntities,
    vendorsAdapterSelectors.selectById,
  ],
  (cart, itemEntities, vendor) =>
    cartItemsAdapterSelectors
      .selectIds(cart.items)
      .map(e => itemEntities[e].itemNumber)
      .join(vendor.joinChars)
);

export const selectQRCodeContent = createAppSelector(
  [selectQRCodeText],
  async qrCodeText => QRCode.toDataURL(qrCodeText)
);

export const checkIfAddedToAllVendors = createAppSelector(
  [cartAdapterSelectors.selectAll, rootParametricSelectors.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (acc, curr) => curr.items.ids.includes(itemId) || acc,
      false
    )
);

export const checkIfItemAddedToOneVendor = createAppSelector(
  [
    cartAdapterSelectors.selectEntities,
    rootParametricSelectors.getCartId,
    rootParametricSelectors.getCartIdAndItemId,
  ],
  (entities, cartId, itemId) =>
    cartItemsAdapterSelectors.selectIds(entities[cartId].items).includes(itemId)
);

export const checkVendorsToAdd = createAppSelector(
  [
    cartAdapterSelectors.selectEntities,
    rootParametricSelectors.getCartId,
    rootParametricSelectors.getCartIdAndItemId,
  ],
  (entities, cartId, itemId) => !entities[cartId].items.ids.includes(itemId)
);

export const checkVendorsAdded = createAppSelector(
  [
    cartAdapterSelectors.selectEntities,
    rootParametricSelectors.getCartId,
    rootParametricSelectors.getCartIdAndItemId,
  ],
  (entities, cartId, itemId) => entities[cartId].items.ids.includes(itemId)
);

export const checkIfAnyAddedToOneVendor = createAppSelector(
  [cartAdapterSelectors.selectEntities, rootParametricSelectors.getCartId],
  (entities, cartId) => entities[cartId].items.ids.length > 0
);

export const selectItemNumber = createAppSelector(
  [itemsAdapterSelectors.selectById],
  item => item.itemNumber
);

export const selectItemSrc = createAppSelector(
  [itemsAdapterSelectors.selectById],
  item => item.src
);

export const selectItemName = createAppSelector(
  [itemsAdapterSelectors.selectById],
  item => item.name
);

export const selectVendorIdByItemId = createAppSelector(
  [vendorsAdapterSelectors.selectAll, rootParametricSelectors.getItemId],
  (vendor, itemId) =>
    vendor.filter(e => e.itemIds.includes(itemId)).map(({ id }) => id),
  {
    memoizeOptions: {
      resultEqualityCheck: shallowEqual,
      equalityCheck: shallowEqual,
      maxSize: 10,
    },
  }
);

export const selectItemNamesAndKeywords = createAppSelector(
  [itemsAdapterSelectors.selectAll],
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
  [cartAdapterSelectors.selectAll],
  carts =>
    carts.reduce<boolean>(
      (acc, curr) => curr.items.ids.length > 0 || acc,
      false
    )
);

export const selectCartItems = createAppSelector(
  [cartAdapterSelectors.selectEntities, rootParametricSelectors.getCartId],
  (entities, cartId) => entities[cartId].items
);

export const selectCartItemsIds = createAppSelector(
  [selectCartItems],
  cartItems => cartItemsAdapterSelectors.selectIds(cartItems)
);

export const selectCartItemNames = createAppSelector(
  [selectCartItemsIds, itemsAdapterSelectors.selectEntities],
  (cartItemIds, itemsEntities) => cartItemIds.map(e => itemsEntities[e].name)
);

export const selectCheckedVendorIds = createAppSelector(
  [searchResultsAdapterSelectors.selectById],
  searchResult =>
    searchResult.checkedVendors.length === 0
      ? emptyArray
      : searchResult.checkedVendors
);

export const isVendorChecked = createAppSelector(
  [selectCheckedVendorIds, rootParametricSelectors.getItemIdAndCartId],
  (checkedVendorIds, vendorId) =>
    !isEmptyArrayReference(checkedVendorIds) &&
    checkedVendorIds.includes(vendorId)
);

export const selectCartItem = createAppSelector(
  [selectCartItems, rootParametricSelectors.getCartIdAndItemId],
  (cartItems, itemId) => cartItemsAdapterSelectors.selectById(cartItems, itemId)
);

export const isMinimized = createAppSelector(
  [selectCartItem],
  cartItems => cartItems.minimized
);

export const selectCategoryName = createAppSelector(
  [categoriesAdapterSelectors.selectById],
  category => category.name
);

export const selectCategoryItemIds = createAppSelector(
  [categoriesAdapterSelectors.selectById],
  category => category.itemIds
);

export const checkIfAddedToVendor = createAppSelector(
  [selectCartItems, rootParametricSelectors.getCartIdAndItemId],
  (cartItems, itemId) => cartItems.ids.includes(itemId)
);
