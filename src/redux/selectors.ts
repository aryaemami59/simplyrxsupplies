import type { ItemNamesAndKeywords } from "../types/api";
import emptyArray from "../utils/emptyArray";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import { createAppSelector, RootSelectorParamsProvider } from "./hooks";

export const ROOT_SELECTOR_PARAMS_PROVIDER: RootSelectorParamsProvider = {
  getItemId: (state, itemId) => itemId,
  getCartId: (state, cartId) => cartId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider;

export const selectVendorsLinks = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.link ?? ""
);

export const selectItemNumber = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.itemNumber ?? ""
);

export const selectItemSrc = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.src ?? ""
);

export const selectItemName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.name ?? ""
);

export const selectVendorIdsByItemId = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.vendors ?? emptyArray
);

export const selectItemNamesAndKeywords = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectAll],
  items =>
    items.map<ItemNamesAndKeywords>(({ name, keywords, id }) => ({
      name,
      keywords,
      id,
    }))
);

export const checkIfAnyItemsAdded = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts =>
    carts.reduce<boolean>(
      (acc, curr) =>
        ADAPTER_SELECTORS.SIMPLE.cartItems.selectTotal(curr.items) > 0 || acc,
      false
    )
);

const selectCartItems = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectById],
  cart => cart?.items ?? ADAPTER_INITIAL_STATES.cartItems
);

export const selectCartItemsIds = createAppSelector(
  [selectCartItems],
  ADAPTER_SELECTORS.SIMPLE.cartItems.selectIds
);

export const selectCartItemNamesStringified = createAppSelector(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds.map<string>(e => itemsEntities[e]?.name ?? "").join(", ")
);

export const selectCheckedVendorIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.checkedVendorItems.selectById],
  checkedVendorItem => checkedVendorItem?.checkedVendors ?? emptyArray
);

export const isVendorChecked = createAppSelector(
  [
    ADAPTER_SELECTORS.GLOBAL.checkedVendorItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendors.includes(vendorId)
);

const selectCartItem = createAppSelector(
  [selectCartItems, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  ADAPTER_SELECTORS.SIMPLE.cartItems.selectById
);

export const isMinimized = createAppSelector(
  [selectCartItem],
  cartItems => !!cartItems?.minimized
);

export const selectCategoryName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.name
);

export const selectCategoryItemIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.itemIds ?? emptyArray
);

export const checkIfAddedToVendor = createAppSelector(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId)
);

export const checkIfAnyAddedToOneVendor = createAppSelector(
  [selectCartItemsIds],
  cartItemsIds => cartItemsIds.length > 0
);

export const selectAddedItemsLength = createAppSelector(
  [selectCartItems],
  ADAPTER_SELECTORS.SIMPLE.cartItems.selectTotal
);

export const selectQRCodeText = createAppSelector(
  [
    selectCartItemsIds,
    ADAPTER_SELECTORS.GLOBAL.items.selectEntities,
    ADAPTER_SELECTORS.GLOBAL.vendors.selectById,
  ],
  (cartItemsIds, itemEntities, vendor) =>
    cartItemsIds.map(e => itemEntities[e]?.itemNumber).join(vendor?.joinChars)
);

export const selectOfficialName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.officialName
);

export const selectVendorItemIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.itemIds ?? emptyArray
);

const selectCartsByItemId = createAppSelector(
  [
    ADAPTER_SELECTORS.GLOBAL.items.selectById,
    ADAPTER_SELECTORS.GLOBAL.cart.selectAll,
  ],
  (item, carts) => carts.filter(e => item?.vendors.includes(e.id))
);

export const checkIfAddedToAllVendors = createAppSelector(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (acc, curr) =>
        ADAPTER_SELECTORS.SIMPLE.cartItems
          .selectIds(curr.items)
          .includes(itemId) && acc,
      true
    )
);
